import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import jwt from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';
import websocket from '@fastify/websocket';
import multipart from '@fastify/multipart';
import swagger from '@fastify/swagger';
import { config } from './shared/utils/config.js';
import { errorHandler } from './shared/middleware/errorHandler.js';
import { logger } from './shared/utils/logger.js';

// Import modules
import { authModule } from './modules/auth/index.js';
import { usersModule } from './modules/users/index.js';
import { propertiesModule } from './modules/properties/index.js';
import { devicesModule } from './modules/devices/index.js';
import { provisioningModule } from './modules/provisioning/index.js';
import { scenesModule } from './modules/scenes/index.js';
import { automationsModule } from './modules/automations/index.js';
import { securityModule } from './modules/security/index.js';
import { emergencyModule } from './modules/emergency/index.js';
import { energyModule } from './modules/energy/index.js';
import { notificationsModule } from './modules/notifications/index.js';
import { telemetryModule } from './modules/telemetry/index.js';
import { auditModule } from './modules/audit/index.js';

async function buildApp() {
  const app = Fastify({
    logger: {
      level: config.logLevel,
    },
  });

  // Register plugins
  await app.register(cors, {
    origin: config.corsOrigins,
    credentials: true,
  });

  await app.register(helmet, {
    contentSecurityPolicy: false, // Configure properly in production
  });

  await app.register(jwt, {
    secret: config.jwtSecret,
    sign: {
      expiresIn: config.jwtAccessExpiry,
    },
  });

  await app.register(rateLimit, {
    max: config.rateLimitApiMax,
    timeWindow: config.rateLimitApiWindow,
  });

  await app.register(websocket);
  await app.register(multipart, {
    limits: {
      fileSize: config.maxFileSize,
    },
  });

  await app.register(swagger, {
    openapi: {
      info: {
        title: 'm2smart API',
        description: 'Commercial Smart Home Platform API',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000/api/v1',
          description: 'Development server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  });

  // Error handler
  app.setErrorHandler(errorHandler);

  // Health check
  app.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  }));

  // API routes
  app.register(authModule, { prefix: '/api/v1/auth' });
  app.register(usersModule, { prefix: '/api/v1/users' });
  app.register(propertiesModule, { prefix: '/api/v1/properties' });
  app.register(devicesModule, { prefix: '/api/v1/devices' });
  app.register(provisioningModule, { prefix: '/api/v1/provisioning' });
  app.register(scenesModule, { prefix: '/api/v1/scenes' });
  app.register(automationsModule, { prefix: '/api/v1/automations' });
  app.register(securityModule, { prefix: '/api/v1/security' });
  app.register(emergencyModule, { prefix: '/api/v1/emergency' });
  app.register(energyModule, { prefix: '/api/v1/energy' });
  app.register(notificationsModule, { prefix: '/api/v1/notifications' });
  app.register(telemetryModule, { prefix: '/api/v1/telemetry' });
  app.register(auditModule, { prefix: '/api/v1/audit' });

  return app;
}

const app = await buildApp();

const start = async () => {
  try {
    await app.listen({
      port: config.port,
      host: config.host,
    });
    logger.info(`🚀 m2smart backend running on http://${config.host}:${config.port}`);
  } catch (err) {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();

export { app };
