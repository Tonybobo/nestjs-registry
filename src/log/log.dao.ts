import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/crud';
import Log from './log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLogDTO } from './log.dto';

@Injectable()
class LogsRepository extends BaseRepository<Log> {
  constructor(
    @InjectRepository(Log)
    private readonly logsRepo: Repository<Log>,
  ) {
    super(logsRepo);
  }

  async createLog(log: CreateLogDTO) {
    const newLog = this.logsRepo.create(log);
    await this.logsRepo.save(newLog, {
      data: {
        isCreatingLogs: true,
      },
    });
    return newLog;
  }
}

export default LogsRepository;
