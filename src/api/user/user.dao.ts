import { Repository } from 'typeorm';
import { User } from './user.entity';
import { BaseRepository } from 'src/common/crud';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {
    super(repository);
  }
}
