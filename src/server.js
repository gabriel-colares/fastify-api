const { loadConfig } = require('./config/env');
const { buildServer } = require('./app');

async function start() {
  const config = loadConfig();
  const app = buildServer(config);

  try {
    // Silenciar log de startup do Fastify
    app.log.level = 'error';
    await app.listen({ host: config.host, port: config.port });
    // Restaurar nível de log após iniciar
    app.log.level = 'info';
    console.info(`🚀 Server rodando em http://${config.host}:${config.port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();