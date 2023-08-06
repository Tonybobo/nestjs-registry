"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const customLogger_1 = require("./log/customLogger");
const helmet_1 = require("helmet");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    app.use((0, helmet_1.default)());
    app.useLogger(app.get(customLogger_1.default));
    app.enableCors();
    const config = app.get(config_1.ConfigService);
    const port = config.get('PORT');
    const useCookie = config.get('COOKIE');
    if (useCookie) {
        app.use(cookieParser(config.get('COOKIE_SECRET')));
    }
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    await app.listen(port, () => {
        console.log('[WEB]', config.get('BASE_URL'));
    });
}
bootstrap();
//# sourceMappingURL=main.js.map