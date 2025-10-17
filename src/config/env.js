const dotenv = require('dotenv');

dotenv.config();

/**
 * @typedef {'development'|'test'|'production'} NodeEnv
 */

/**
 * @typedef {Object} AppConfig
 * @property {NodeEnv} env
 * @property {string} host
 * @property {number} port
 */

/**
 * Carrega a configuração de ambiente
 * @returns {AppConfig}
 */
function loadConfig() {
  const env = process.env.NODE_ENV || 'development';
  const port = Number(process.env.PORT ?? 3000);
  const host = process.env.HOST ?? (env === 'production' ? '0.0.0.0' : '127.0.0.1');

  if (Number.isNaN(port)) {
    throw new Error('PORT deve ser um número');
  }

  return { env, host, port };
}

module.exports = { loadConfig };