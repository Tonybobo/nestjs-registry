import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import CustomLogger from './log/customLogger';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.use(helmet());
  app.useLogger(app.get(CustomLogger));
  app.enableCors();
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT');
  const useCookie = config.get<boolean>('COOKIE');
  if (useCookie) {
    app.use(cookieParser(config.get<string>('COOKIE_SECRET')));
  }
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
}
bootstrap();
