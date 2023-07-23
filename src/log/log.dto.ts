import { IsString } from 'class-validator';

export class CreateLogDTO {
  @IsString()
  public context: string;

  @IsString()
  public message: string;

  @IsString()
  public level: string;
}
