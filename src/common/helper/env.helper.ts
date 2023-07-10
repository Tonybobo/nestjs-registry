import { existsSync } from 'fs';
import { resolve } from 'path';

export const getEnvPath = (dest: string) => {
  const env: string = process.env.NODE_ENV;
  const fallback = `${dest}/.env`;
  const filename = env ? `${env}.env` : 'dev.env';
  let filepath: string = resolve(`${dest}/${filename}`);
  if (!existsSync(filepath)) filepath = fallback;
  return filepath;
};
