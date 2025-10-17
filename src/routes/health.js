const { Type } = require('@sinclair/typebox');

const HealthResponse = Type.Object({
  status: Type.Literal('ok'),
  uptime: Type.Number(),
  timestamp: Type.String(),
});

/** @type {import('fastify').FastifyPluginAsync} */
const healthRoutes = async (app) => {
  app.get(
    '/',
    {
      schema: {
        response: {
          200: HealthResponse,
        },
      },
    },
    async () => {
      return {
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      };
    }
  );
};

module.exports = healthRoutes;