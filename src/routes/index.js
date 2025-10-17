/**
 * Registra rotas com prefixos
 * @param {import('fastify').FastifyInstance} app
 */
function registerRoutes(app) {
  app.register(async function (instance) {
    instance.register(require('./health'), { prefix: '/health' });
  }, { prefix: '/api' });
}

module.exports = { registerRoutes };