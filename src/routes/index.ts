import type { FastifyInstance } from 'fastify';
import healthRoutes from './health';

export function registerRoutes(app: FastifyInstance) {
  app.register(async function (instance) {
    instance.register(healthRoutes, { prefix: '/health' });
  }, { prefix: '/api' });
}