"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class DatabaseLogger {
    constructor() {
        this.logger = new common_1.Logger('DB');
    }
    logQuery(query, parameters, queryRunner) {
        if (queryRunner?.data?.isCreatingLogs)
            return;
        this.logger.log(`${query} -- Parameters:${this.stringifyParams(parameters)}`);
    }
    logQueryError(error, query, parameters) {
        this.logger.error(`${query} -- Parameters:${this.stringifyParams(parameters)} -- ${error}`);
    }
    logQuerySlow(time, query, parameters) {
        this.logger.warn(`Execute Time: ${time} -- Parameters :${this.stringifyParams(parameters)} -- ${query}`);
    }
    logSchemaBuild(message) {
        this.logger.log(message);
    }
    logMigration(message) {
        this.logger.log(message);
    }
    log(level, message) {
        if (level === 'log')
            return this.logger.log(message);
        if (level === 'info')
            return this.logger.debug(message);
        if (level === 'warn')
            return this.logger.warn(message);
    }
    stringifyParams(params) {
        try {
            return JSON.stringify(params);
        }
        catch (err) {
            return JSON.stringify({ params, err });
        }
    }
}
exports.default = DatabaseLogger;
//# sourceMappingURL=databaseLogger.js.map