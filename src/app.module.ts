import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { BookService } from './book/service/book.service';
import { FsService } from './fs.service';

@Module({
  imports: [],
  controllers: [AppController, BookController],
  providers: [AppService, BookService, FsService],
})
export class AppModule {}
