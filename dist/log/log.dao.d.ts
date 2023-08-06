import { BaseRepository } from 'src/common/crud';
import Log from './log.entity';
import { Repository } from 'typeorm';
import { CreateLogDTO } from './log.dto';
declare class LogsRepository extends BaseRepository<Log> {
    private readonly logsRepo;
    constructor(logsRepo: Repository<Log>);
    createLog(log: CreateLogDTO): Promise<Log>;
}
export default LogsRepository;
