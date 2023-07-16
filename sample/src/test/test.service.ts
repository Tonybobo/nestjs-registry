import { Injectable } from '@nestjs/common';
import { TestRepository } from './test.dao';
import { CreateTestDto } from './test.dto';
import { Test } from './test.entity';

@Injectable()
export class TestService {
  constructor(private readonly testDao: TestRepository) {}
  public getTest(id: number): Promise<Test> {
    return this.testDao.findOneBy({ id: id });
  }

  public createTest(body: CreateTestDto): Promise<Test | Test[]> {
    const test: Test = new Test();
    test.name = body.name;

    return this.testDao.save(test);
  }
}
