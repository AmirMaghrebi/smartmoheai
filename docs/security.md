# m2smart Security Architecture

## Security Principles

1. **Zero Trust**: Never trust, always verify
2. **Least Privilege**: Minimum necessary permissions
3. **Defense in Depth**: Multiple security layers
4. **Secure by Default**: Safe configurations out of the box
5. **Security by Design**: Built-in, not bolted-on

---

## Authentication System

### User Authentication Flow

```
┌──────────┐    ┌───────────┐    ┌──────────┐    ┌──────────┐
│  User    │───►│  Backend  │───►│ Database │───►│  Redis   │
│ (Client) │    │   API     │    │   (DB)   │    │ (Session)│
└──────────┘    └───────────┘    └──────────┘    └──────────┘
```

### Authentication Methods

#### Primary: Email + Password
- Password hashing: bcrypt (cost factor 12)
- Minimum password strength requirements
- Account lockout after 5 failed attempts
- Email verification required before first login

#### Token Strategy
- **Access Token**: JWT, 15-minute expiry
- **Refresh Token**: Random UUID, 30-day expiry, stored in DB
- Token rotation on each refresh
- Device fingerprinting for session tracking

#### Optional MFA (Future)
- TOTP (Google Authenticator, Authy)
- SMS-based (for emergency scenarios)
- Backup codes

### Session Management

```typescript
interface Session {
  id: string;
  userId: string;
  refreshToken: string; // hashed
  deviceId: string;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  expiresAt: Date;
  lastActiveAt: Date;
}
```

### Password Recovery

1. User requests password reset
2. System generates single-use token (1-hour expiry)
3. Token sent to verified email
4. User clicks link, enters new password
5. All existing sessions invalidated
6. Audit log entry created

---

## Authorization Model

### Role-Based Access Control (RBAC)

#### Predefined Roles

| Role | Properties | Spaces | Devices | Users | Security | Emergency |
|------|-----------|--------|---------|-------|----------|-----------|
| **Owner** | Full | Full | Full | Full | Full | Full |
| **Administrator** | Full | Full | Full | Manage | Full | Full |
| **Resident** | View | Assigned | Assigned | None | Limited | View |
| **Guest** | View | Assigned | Limited | None | None | None |
| **Technician** | View | All | Full (temp) | None | View | View |

#### Permission Granularity

```typescript
enum Permission {
  // Property
  PROPERTY_VIEW = 'property:view',
  PROPERTY_EDIT = 'property:edit',
  PROPERTY_DELETE = 'property:delete',
  
  // Space
  SPACE_CREATE = 'space:create',
  SPACE_EDIT = 'space:edit',
  SPACE_DELETE = 'space:delete',
  
  // Device
  DEVICE_VIEW = 'device:view',
  DEVICE_CONTROL = 'device:control',
  DEVICE_CONFIGURE = 'device:configure',
  DEVICE_DELETE = 'device:delete',
  
  // Scene
  SCENE_CREATE = 'scene:create',
  SCENE_EXECUTE = 'scene:execute',
  SCENE_DELETE = 'scene:delete',
  
  // Automation
  AUTOMATION_CREATE = 'automation:create',
  AUTOMATION_EDIT = 'automation:edit',
  AUTOMATION_DELETE = 'automation:delete',
  
  // Security
  SECURITY_ARM = 'security:arm',
  SECURITY_DISARM = 'security:disarm',
  SECURITY_VIEW_EVENTS = 'security:view_events',
  
  // Emergency
  EMERGENCY_TRIGGER = 'emergency:trigger',
  EMERGENCY_VIEW = 'emergency:view',
  EMERGENCY_CONFIGURE = 'emergency:configure',
  
  // Users
  USER_INVITE = 'user:invite',
  USER_REMOVE = 'user:remove',
  USER_CHANGE_ROLE = 'user:change_role',
}
```

### Authorization Enforcement

```typescript
// Middleware example
async function authorize(permission: Permission) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user;
    const hasPermission = await checkPermission(user.id, permission);
    
    if (!hasPermission) {
      throw new ForbiddenError('Insufficient permissions');
    }
  };
}

// Usage
app.post('/devices/:id/control', 
  { preHandler: authorize(Permission.DEVICE_CONTROL) },
  async (request, reply) => { ... }
);
```

---

## Device Security

### Device Identity

Each ESP32 device has:
- **Device ID**: UUID v4 (unique identifier)
- **Device Key**: 256-bit symmetric key (AES-256)
- **Certificate**: X.509 (for mTLS deployments)
- **Firmware Version**: Semantic versioning
- **Hardware Revision**: Manufacturing batch info

### Secure Provisioning Flow

```
1. Factory: Device shipped with unique key burned in
2. User: Scans QR code (contains Device ID + provisioning token)
3. App: Sends provisioning request to backend
4. Backend: Validates token, associates device with property
5. Backend: Generates MQTT credentials (username + password)
6. App: Sends credentials to device via local network
7. Device: Connects to MQTT broker with credentials
8. Backend: Marks device as "active", invalidates provisioning token
```

### QR Code Format

```json
{
  "deviceId": "uuid-string",
  "provisioningToken": "random-32-char",
  "firmwareVersion": "1.0.0",
  "deviceType": "relay-switch",
  "checksum": "sha256-hash"
}
```

### MQTT Security

#### Connection Authentication
- Username: `device_{deviceId}`
- Password: HMAC-SHA256(deviceKey, timestamp)
- Client ID: `device_{deviceId}_{timestamp}`

#### TLS Configuration (Production)
- MQTT over TLS (port 8883)
- Server certificate validation
- Optional: mTLS with device certificates

#### Topic Authorization
```
# Allowed topics per device
devices/{deviceId}/state          # Publish only
devices/{deviceId}/commands       # Subscribe only
devices/{deviceId}/telemetry      # Publish only
devices/{deviceId}/ota            # Subscribe only (firmware updates)

# Forbidden topics
devices/+/+                       # Wildcard not allowed for devices
system/#                          # System topics restricted
users/#                           # User topics restricted
```

### Firmware Security

#### OTA Update Process
1. Backend signs firmware binary with private key
2. Signature stored alongside binary
3. Device downloads firmware + signature
4. Device verifies signature with public key
5. If valid: install update
6. If invalid: reject and report error

#### Firmware Integrity
- SHA-256 hash verification
- Digital signature (RSA-2048 or ECDSA-P256)
- Rollback protection (minimum version enforcement)

---

## API Security

### Input Validation

All inputs validated with Zod schemas:

```typescript
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

const deviceControlSchema = z.object({
  command: z.enum(['on', 'off', 'toggle']),
  value: z.number().min(0).max(100).optional(),
});
```

### Rate Limiting

```typescript
// Per-user rate limits
const rateLimits = {
  auth: { max: 5, window: '1m' },      // Login attempts
  api: { max: 100, window: '1m' },     // General API calls
  mqtt: { max: 50, window: '1s' },     // MQTT messages
  sms: { max: 3, window: '1h' },       // Emergency SMS
  call: { max: 3, window: '1h' },      // Emergency calls
};
```

### CORS Configuration

```typescript
{
  origin: ['https://m2smart.com', 'https://app.m2smart.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  credentials: true,
  maxAge: 86400,
}
```

### Security Headers

```typescript
{
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'; script-src 'self'",
  'Referrer-Policy': 'strict-origin-when-cross-origin',
}
```

---

## Data Protection

### Encryption at Rest

- **Passwords**: bcrypt (cost 12)
- **Tokens**: AES-256-GCM
- **Device Keys**: Encrypted with master key (HSM or secure env var)
- **PII**: Encrypted in database (email, phone numbers)

### Encryption in Transit

- **API**: HTTPS (TLS 1.3)
- **MQTT**: TLS 1.3 (port 8883)
- **WebSocket**: WSS (TLS 1.3)
- **Database**: SSL connections enforced

### Data Minimization

Only collect necessary data:
- ✅ User email (for authentication)
- ✅ Phone number (for emergency alerts - optional)
- ✅ Property addresses (for location context)
- ❌ No unnecessary personal data
- ❌ No third-party tracking without consent

---

## Emergency Alert Security

### SMS/Call Provider Integration

```typescript
interface SMSProvider {
  send(phone: string, message: string): Promise<void>;
  call(phone: string, voiceMessage: string): Promise<void>;
}

// Faraz SMS implementation (to be added)
class FarazSMSProvider implements SMSProvider {
  private apiKey: string;
  private senderId: string;
  
  async send(phone: string, message: string) {
    // Implementation with proper credential handling
  }
}
```

### Credential Management

- API keys stored in environment variables
- Never committed to Git
- Rotated every 90 days
- Separate keys for development/staging/production

### Alert Throttling

To prevent abuse:
- Maximum 3 SMS per hour per user
- Maximum 3 calls per hour per user
- Cooldown period between repeated alerts
- Duplicate detection (same event within 5 minutes)

---

## Audit Logging

### Logged Events

| Event Type | Details Logged |
|------------|----------------|
| Login | User ID, IP, device, success/failure |
| Logout | User ID, session duration |
| Password Change | User ID, timestamp |
| Device Control | User ID, device ID, action, result |
| Permission Change | Actor, target user, old/new role |
| Emergency Alert | Trigger, recipients, delivery status |
| Firmware Update | Device ID, old/new version, result |
| Configuration Change | What changed, who, when |

### Log Storage

- Stored in `audit_logs` table (TimescaleDB hypertable)
- Retention: 2 years (configurable)
- Immutable (no delete/update allowed)
- Export capability for compliance

---

## Security Testing

### Automated Tests

- Unit tests for authorization logic
- Integration tests for authentication flows
- Penetration testing before major releases
- Dependency vulnerability scanning (npm audit, Snyk)

### Manual Testing Checklist

- [ ] SQL injection prevention
- [ ] XSS vulnerability check
- [ ] CSRF protection verification
- [ ] Session fixation testing
- [ ] Privilege escalation attempts
- [ ] Rate limiting effectiveness
- [ ] Token expiration handling
- [ ] Device impersonation prevention

---

## Incident Response

### Security Incident Categories

1. **Critical**: Active breach, data exfiltration
2. **High**: Unauthorized access attempt succeeded
3. **Medium**: Suspicious activity detected
4. **Low**: Policy violation, misconfiguration

### Response Procedures

#### Critical Incident
1. Isolate affected systems
2. Revoke all active sessions
3. Force password reset for affected users
4. Notify affected users within 24 hours
5. Conduct forensic analysis
6. Patch vulnerability
7. Document incident

### Contact Information

- Security Team: security@m2smart.com (to be configured)
- Emergency Hotline: (to be configured)

---

## Compliance Considerations

### GDPR (if serving EU users)

- Right to access personal data
- Right to deletion ("right to be forgotten")
- Data portability
- Consent management
- Data Processing Agreement with providers

### Local Regulations (Iran)

- Data residency (servers in Iran if required)
- SMS provider licensing (Faraz SMS compliant)
- Emergency service integration regulations

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Status**: Approved for Implementation  
**Next Review**: After MVP launch
