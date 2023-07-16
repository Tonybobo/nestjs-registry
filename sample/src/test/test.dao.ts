import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../src/common/crud/base';
import { Test } from './test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TestRepository extends BaseRepository<Test> {
  constructor(
    @InjectRepository(Test) private readonly repository: Repository<Test>,
  ) {
    super(repository);
  }
}
