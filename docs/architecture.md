# m2smart Architecture

## System Overview

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   User      │◄────►│   Cloud      │◄────►│   ESP32     │
│  (Web/PWA)  │      │   Platform   │      │   Devices   │
└─────────────┘      └──────────────┘      └─────────────┘
       │                    │                      │
       │ WebSocket          │ MQTT                 │ Wi-Fi
       │ REST API           │ WebSocket            │ Local Network
       ▼                    ▼                      ▼
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   CDN/      │      │  PostgreSQL  │      │   Gateway   │
│   Static    │      │  TimescaleDB │      │   (Optional)│
│   Assets    │      │  Redis       │      │             │
└─────────────┘      └──────────────┘      └─────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Vue 3 + Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **UI Components**: Custom Design System
- **PWA**: Workbox
- **Real-time**: WebSocket Client + MQTT.js
- **i18n**: Vue I18n
- **Theme**: CSS Variables + Design Tokens

### Backend
- **Runtime**: Node.js 20+
- **Language**: TypeScript
- **Framework**: Fastify (lightweight, high performance)
- **Database ORM**: Prisma or Kysely
- **Validation**: Zod
- **Authentication**: JWT + Refresh Tokens
- **MQTT Client**: Async-MQTT or MQTT.js
- **SMS Provider**: Pluggable interface (Faraz SMS ready)

### Database
- **Primary**: PostgreSQL 15+
- **Time-series**: TimescaleDB (extension for PostgreSQL)
- **Cache**: Redis 7+
- **MQTT Broker**: EMQX 5+ (or HiveMQ, Mosquitto for smaller scale)

## Modular Monolith Structure

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/           # Authentication & Authorization
│   │   ├── users/          # User management
│   │   ├── properties/     # Property & Space management
│   │   ├── devices/        # Device abstraction & control
│   │   ├── provisioning/   # Device onboarding
│   │   ├── scenes/         # Scene management
│   │   ├── automations/    # Automation engine
│   │   ├── security/       # Security modes & alerts
│   │   ├── emergency/      # Emergency notifications (SMS/Call)
│   │   ├── energy/         # Energy monitoring
│   │   ├── notifications/  # Push notifications
│   │   ├── telemetry/      # Time-series data handling
│   │   └── audit/          # Audit logging
│   ├── shared/
│   │   ├── utils/
│   │   ├── middleware/
│   │   ├── validators/
│   │   └── types/
│   └── app.ts
└── prisma/                 # Database schema
```

## Data Flow

### Online Control (Primary)
```
User → Web App → REST/WebSocket → Backend → MQTT Broker → ESP32
ESP32 → MQTT Broker → Backend → WebSocket → User
```

### Offline Control (Fallback)
```
User → Web App (PWA) → Local Network → ESP32 (direct MQTT or HTTP)
```

### Emergency Alert Flow
```
ESP32 detects issue → MQTT → Backend → Emergency Module
→ SMS Provider (Faraz SMS) → User Phone
→ Call Provider → User Phone
→ Push Notification → User Device
```

## Security Architecture

### Authentication
- Email/Password with bcrypt hashing
- JWT Access Tokens (short-lived)
- Refresh Tokens (rotating, stored in DB)
- Optional MFA (TOTP)
- Session management with device fingerprinting

### Authorization
- Role-Based Access Control (RBAC)
- Granular permissions per property/space/device
- Policy-based authorization for complex rules

### Device Security
- Unique device identity (UUID + cryptographic key)
- Secure provisioning with QR codes
- TLS for MQTT (mTLS for high-security deployments)
- Firmware signature verification
- Regular key rotation

### API Security
- Rate limiting per user/IP
- Input validation with Zod
- SQL injection prevention (ORM)
- CORS configuration
- Helmet headers
- Request signing for sensitive operations

## Scalability Strategy

### Phase 1: Modular Monolith (Current)
- Single codebase with clear module boundaries
- Vertical scaling (more powerful server)
- Database connection pooling
- Redis caching for frequent queries

### Phase 2: Horizontal Scaling (When needed)
- Load balancer (Nginx/Traefik)
- Multiple backend instances
- Redis Cluster
- PostgreSQL read replicas
- MQTT broker cluster (EMQX supports clustering)

### Phase 3: Service Extraction (If scale demands)
- Extract high-load modules (telemetry, notifications)
- Event-driven architecture with message queue
- Microservices for specific domains

## Database Schema Overview

### Core Tables
- `users` - User accounts
- `properties` - Homes, offices, villas
- `spaces` - Rooms, floors, zones
- `devices` - IoT devices
- `device_capabilities` - Device features
- `device_states` - Current state
- `scenes` - Predefined actions
- `automations` - Automation rules
- `user_property_roles` - Permissions

### Time-series Tables (TimescaleDB)
- `telemetry` - Sensor readings
- `energy_readings` - Power consumption
- `events` - System events
- `audit_logs` - Security audit trail

## Deployment Architecture (Ubuntu Server)

```
HP Server (Ubuntu 22.04 LTS)
├── Docker Engine
│   ├── PostgreSQL + TimescaleDB container
│   ├── Redis container
│   ├── EMQX container
│   ├── Backend container (Node.js)
│   └── Frontend container (Nginx serving PWA)
├── Nginx (reverse proxy, SSL termination)
├── Let's Encrypt (SSL certificates)
└── Systemd services (backup, monitoring)
```

## Performance Targets

- API response time: < 100ms (p95)
- WebSocket latency: < 50ms
- MQTT message delivery: < 100ms
- Page load time: < 2s (3G), < 1s (4G/WiFi)
- PWA offline functionality: Full core features
- Concurrent users: 100,000+ (with proper scaling)
- Devices per property: Up to 500
- Properties per user: Unlimited (practical limit: 50)

## Monitoring & Observability

- Application logs (structured JSON)
- Error tracking (Sentry or self-hosted)
- Metrics (Prometheus + Grafana)
- Uptime monitoring
- Database performance monitoring
- MQTT broker metrics

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Status**: Approved for Implementation
