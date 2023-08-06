"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogLevel = void 0;
const getLogLevel = (isProduction) => isProduction
    ? ['log', 'warn', 'error']
    : ['log', 'error', 'warn', 'debug', 'verbose'];
exports.getLogLevel = getLogLevel;
//# sourceMappingURL=getLogLevel.js.map