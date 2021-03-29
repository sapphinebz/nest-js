import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Book } from './book';
import { BookService } from './service/book.service';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}
  @Get()
  getBooks(): Observable<Book[]> {
    return this.bookService.readBooks();
  }

  @Get(':id')
  getBookById(@Param('id') id: number): Observable<Book> {
    return this.bookService.findBookById(id);
  }

  @Post()
  persistBook(@Body() book: Book) {
    return this.bookService.persistBook(book);
  }

  @Delete(':id')
  deleteBookById(@Param('id') id: number) {
    return this.bookService.deleteBookById(id);
  }
}
