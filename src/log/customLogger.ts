import {
  ConsoleLogger,
  ConsoleLoggerOptions,
  Injectable,
} from '@nestjs/common';
import LogService from './logs.service';
import { getLogLevel } from './utils/getLogLevel';

@Injectable()
class CustomLogger extends ConsoleLogger {
  private readonly logsService: LogService;

  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    logsService: LogService,
  ) {
    const environment = process.env.NODE_ENV;
    super(context, {
      ...options,
      logLevels: getLogLevel(environment === 'production'),
    });
    this.logsService = logsService;
  }

  log(message: any, context?: string): void {
    super.log.apply(this, [message, context]);
    this.logsService.createLog({
      message,
      context,
      level: 'log',
    });
  }

  error(message: any, stack?: string, context?: string): void {
    super.error.apply(this, [message, stack, context]);
    this.logsService.createLog({
      message,
      context,
      level: 'error',
    });
  }

  warn(message: any, context?: string): void {
    super.warn.apply(this, [message, context]);

    this.logsService.createLog({
      message,
      context,
      level: 'error',
    });
  }

  debug(message: string, context?: string) {
    super.debug.apply(this, [message, context]);
    this.logsService.createLog({
      context,
      level: 'error',
      message,
    });
  }

  verbose(message: any, context?: string): void {
    super.debug.apply(this, [message, context]);
    this.logsService.createLog({
      message,
      context,
      level: 'error',
    });
  }
}

export default CustomLogger;
