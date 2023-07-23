import { LogLevel } from '@nestjs/common';

export const getLogLevel = (isProduction: boolean): LogLevel[] =>
  isProduction
    ? ['log', 'warn', 'error']
    : ['log', 'error', 'warn', 'debug', 'verbose'];
