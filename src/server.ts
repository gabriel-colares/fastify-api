import { loadConfig } from './config/env';
import { buildServer } from './app';

async function start() {
  const config = loadConfig();
  const app = buildServer(config);

  try {
    await app.listen({ host: config.host, port: config.port });
    console.info(`🚀 Server rodando em http://${config.host}:${config.port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();