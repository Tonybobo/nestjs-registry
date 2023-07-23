import { QueryRunner, Logger as TypeOrmLogger } from 'typeorm';
import { Logger as NestLogger } from '@nestjs/common';

class DatabaseLogger implements TypeOrmLogger {
  private readonly logger = new NestLogger('DB');

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (queryRunner?.data?.isCreatingLogs) return;
    this.logger.log(
      `${query} -- Parameters:${this.stringifyParams(parameters)}`,
    );
  }

  logQueryError(error: string | Error, query: string, parameters?: any[]) {
    this.logger.error(
      `${query} -- Parameters:${this.stringifyParams(parameters)} -- ${error}`,
    );
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    this.logger.warn(
      `Execute Time: ${time} -- Parameters :${this.stringifyParams(
        parameters,
      )} -- ${query}`,
    );
  }

  logSchemaBuild(message: string) {
    this.logger.log(message);
  }

  logMigration(message: string) {
    this.logger.log(message);
  }

  log(level: 'log' | 'info' | 'warn', message: any) {
    if (level === 'log') return this.logger.log(message);
    if (level === 'info') return this.logger.debug(message);
    if (level === 'warn') return this.logger.warn(message);
  }

  private stringifyParams(params: unknown[]) {
    try {
      return JSON.stringify(params);
    } catch (err) {
      return JSON.stringify({ params, err });
    }
  }
}

export default DatabaseLogger;
