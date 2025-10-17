import type { FastifyPluginAsync } from 'fastify';
import { Type, Static } from '@sinclair/typebox';

const HealthResponse = Type.Object({
  status: Type.Literal('ok'),
  uptime: Type.Number(),
  timestamp: Type.String(),
});

type HealthResponse = Static<typeof HealthResponse>;

const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get<{ Reply: HealthResponse }>(
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

export default healthRoutes;