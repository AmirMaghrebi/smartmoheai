import { FastifyError } from 'fastify';
import { logger } from '../utils/logger.js';

interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  code?: string;
}

export const errorHandler = (
  error: FastifyError,
  request: any,
  reply: any
) => {
  logger.error({
    err: error,
    method: request.method,
    url: request.url,
    userId: request.user?.id,
  }, 'Request error');

  const response: ErrorResponse = {
    error: error.name || 'Internal Server Error',
    message: error.message || 'An unexpected error occurred',
    statusCode: error.statusCode || 500,
  };

  if (error.validation) {
    response.code = 'VALIDATION_ERROR';
  }

  return reply.status(response.statusCode).send(response);
};
