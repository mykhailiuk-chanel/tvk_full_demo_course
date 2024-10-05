import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World by Vitalii AQA! NEW port = 3053';
  }
}
