import dotenv from 'dotenv';

dotenv.config();

export type AppConfig = {
  env: 'development' | 'test' | 'production';
  host: string;
  port: number;
};

export function loadConfig(): AppConfig {
  const env = (process.env.NODE_ENV as AppConfig['env']) || 'development';
  const port = Number(process.env.PORT ?? 3000);
  const host = process.env.HOST ?? (env === 'production' ? '0.0.0.0' : '127.0.0.1');

  if (Number.isNaN(port)) {
    throw new Error('PORT deve ser um número');
  }

  return { env, host, port };
}