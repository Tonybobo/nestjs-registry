import { NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
declare class LogsMiddleware implements NestMiddleware {
    private readonly logger;
    use(req: Request, res: Response, next: NextFunction): void;
}
export default LogsMiddleware;
