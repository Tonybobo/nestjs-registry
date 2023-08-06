import { QueryRunner, Logger as TypeOrmLogger } from 'typeorm';
declare class DatabaseLogger implements TypeOrmLogger {
    private readonly logger;
    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): void;
    logQueryError(error: string | Error, query: string, parameters?: any[]): void;
    logQuerySlow(time: number, query: string, parameters?: any[]): void;
    logSchemaBuild(message: string): void;
    logMigration(message: string): void;
    log(level: 'log' | 'info' | 'warn', message: any): void;
    private stringifyParams;
}
export default DatabaseLogger;
