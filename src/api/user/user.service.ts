import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import { UserRepository } from './user.dao';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}
  public getUser(id: number): Promise<User> {
    return this.repository.findOneBy({ id: id });
  }

  public createUser(body: CreateUserDto): Promise<User | User[]> {
    const user: User = new User();

    user.name = body.name;
    user.email = body.email;

    return this.repository.save(user);
  }
}
