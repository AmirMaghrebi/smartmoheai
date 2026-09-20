import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  HOST: z.string().default('0.0.0.0'),
  
  // Database
  DATABASE_URL: z.string().url(),
  TIMESCALE_DB_URL: z.string().url().optional(),
  
  // Redis
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().transform(Number).default('6379'),
  REDIS_PASSWORD: z.string().optional(),
  
  // JWT
  JWT_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('30d'),
  
  // MQTT
  MQTT_BROKER_HOST: z.string().default('localhost'),
  MQTT_BROKER_PORT: z.string().transform(Number).default('1883'),
  MQTT_BROKER_WS_PORT: z.string().transform(Number).default('9001'),
  MQTT_USERNAME: z.string(),
  MQTT_PASSWORD: z.string(),
  MQTT_USE_TLS: z.string().transform(v => v === 'true').default('false'),
  
  // SMS Provider
  SMS_PROVIDER: z.string().default('farazsms'),
  SMS_API_KEY: z.string().optional(),
  SMS_SENDER_ID: z.string().default('m2smart'),
  
  // Call Provider
  CALL_PROVIDER: z.string().optional(),
  CALL_API_KEY: z.string().optional(),
  
  // Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_USER: z.string().email().optional(),
  SMTP_PASSWORD: z.string().optional(),
  
  // Security
  BCRYPT_ROUNDS: z.string().transform(Number).default('12'),
  RATE_LIMIT_AUTH_MAX: z.string().transform(Number).default('5'),
  RATE_LIMIT_AUTH_WINDOW: z.string().transform(Number).default('60000'),
  RATE_LIMIT_API_MAX: z.string().transform(Number).default('100'),
  RATE_LIMIT_API_WINDOW: z.string().transform(Number).default('60000'),
  
  // CORS
  CORS_ORIGINS: z.string().transform(s => s.split(',')).default('http://localhost:5173'),
  
  // File Upload
  MAX_FILE_SIZE: z.string().transform(Number).default('5242880'),
  
  // Logging
  LOG_LEVEL: z.string().default('info'),
  LOG_FORMAT: z.enum(['json', 'pretty']).default('json'),
  
  // Emergency Alerts
  EMERGENCY_SMS_MAX_PER_HOUR: z.string().transform(Number).default('3'),
  EMERGENCY_CALL_MAX_PER_HOUR: z.string().transform(Number).default('3'),
  EMERGENCY_COOLDOWN_MINUTES: z.string().transform(Number).default('5'),
  
  // Data Retention
  TELEMETRY_RETENTION_DAYS: z.string().transform(Number).default('365'),
  AUDIT_LOG_RETENTION_DAYS: z.string().transform(Number).default('730'),
  EVENTS_RETENTION_DAYS: z.string().transform(Number).default('365'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = parsed.data;
