import Fastify from 'fastify';
import sensible from '@fastify/sensible';
import cors from '@fastify/cors';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { registerRoutes } from './routes';
import type { AppConfig } from './config/env';

export function buildServer(config: AppConfig) {
  const app = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();

  app.register(sensible);
  app.register(cors, {
    origin: true,
  });

  // Registrar rotas com prefixos
  registerRoutes(app);

  // Tratamento global de erros
  app.setErrorHandler((error, _request, reply) => {
    const statusCode = (error as any).statusCode ?? 500;
    const message = config.env === 'production' ? 'Internal Server Error' : error.message;

    app.log.error({ err: error }, 'Unhandled error');

    reply.status(statusCode).send({
      error: {
        message,
        statusCode,
      },
    });
  });

  // Handler para rotas inexistentes
  app.setNotFoundHandler((_request, reply) => {
    reply.status(404).send({
      error: {
        message: 'Route not found',
        statusCode: 404,
      },
    });
  });

  return app;
}