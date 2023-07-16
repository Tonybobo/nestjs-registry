import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './test.dto';
import { Test } from './test.entity';

@Controller('test')
export class TestController {
  @Inject(TestService)
  private readonly service: TestService;

  @Get(':id')
  public getTest(@Param('id', ParseIntPipe) id: number): Promise<Test> {
    return this.service.getTest(id);
  }

  @Post()
  public createTest(@Body() body: CreateTestDto): Promise<Test | Test[]> {
    return this.service.createTest(body);
  }
}
