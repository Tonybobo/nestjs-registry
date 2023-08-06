import LogsRepository from './log.dao';
import { CreateLogDTO } from './log.dto';
declare class LogService {
    private readonly logsDao;
    constructor(logsDao: LogsRepository);
    createLog(log: CreateLogDTO): Promise<import("./log.entity").default>;
}
export default LogService;
