import * as dotenv from 'dotenv';

dotenv.config();

export const testEnv = {
  sauceUsername: getRequiredEnv('SAUCE_USERNAME'),
  saucePassword: getRequiredEnv('SAUCE_PASSWORD'),
} as const;

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}
