import { Controller, Get } from '@nestjs/common';
import { Book } from './book';

@Controller('book')
export class BookController {
  @Get()
  findBookAll(): Book[] {
    return [
      {
        bookId: 0,
        bookName: 'BookName0',
      },
      {
        bookId: 1,
        bookName: 'BookName1',
      },
    ];
  }
}
