import { Injectable } from '@nestjs/common';
import LogsRepository from './log.dao';
import { CreateLogDTO } from './log.dto';

@Injectable()
class LogService {
  constructor(private readonly logsDao: LogsRepository) {}

  async createLog(log: CreateLogDTO) {
    return this.logsDao.createLog(log);
  }
}

export default LogService;
