import { Controller, Get } from '@nestjs/common';

@Controller('book')
export class BookController {
  @Get()
  findBookAll(): string {
    return '';
  }
}
