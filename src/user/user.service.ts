import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  root(): string {
    return 'Hello World!';
  }
}
