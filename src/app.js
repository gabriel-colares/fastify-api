const Fastify = require('fastify');
const sensible = require('@fastify/sensible');
const cors = require('@fastify/cors');
const { registerRoutes } = require('./routes');

/**
 * Cria a instância Fastify e registra plugins/rotas
 * @param {import('./config/env').AppConfig} config
 */
function buildServer(config) {
  const app = Fastify({ logger: true });

  app.register(sensible);
  app.register(cors, { origin: true });

  // Registrar rotas com prefixos
  registerRoutes(app);

  // Tratamento global de erros
  app.setErrorHandler((error, _request, reply) => {
    const statusCode = error && error.statusCode ? error.statusCode : 500;
    const message = config.env === 'production' ? 'Internal Server Error' : (error.message || 'Erro');

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

module.exports = { buildServer };