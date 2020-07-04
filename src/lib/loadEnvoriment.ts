import * as dotenv from 'dotenv';

const envObj: { production: string; development: string; test: string } = {
  production: '.env',
  development: '.env.dev',
  test: '.env.test'
};

export function loadEnv() {
  let currentEnv = process.env.NODE_ENV as
    | undefined
    | 'production'
    | 'test'
    | 'development';

  if (!currentEnv) currentEnv = 'development';

  const selectedEnv = envObj[currentEnv];
  if (!selectedEnv) return '.env';

  return dotenv.config({ path: selectedEnv });
}
