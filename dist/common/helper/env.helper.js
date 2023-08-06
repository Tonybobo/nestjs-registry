"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvPath = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const getEnvPath = (dest) => {
    const env = process.env.NODE_ENV;
    const fallback = `${dest}/.env`;
    const filename = env ? `${env}.env` : 'dev.env';
    let filepath = (0, path_1.resolve)(`${dest}/${filename}`);
    if (!(0, fs_1.existsSync)(filepath))
        filepath = fallback;
    return filepath;
};
exports.getEnvPath = getEnvPath;
//# sourceMappingURL=env.helper.js.map