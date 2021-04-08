import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FsService } from 'src/fs.service';
import { Book } from '../book';

@Injectable()
export class BookService {
  private bookJsonFile = './book.json';
  constructor(private fs: FsService) {}
  /**
   * อ่านข้อมูล book จาก json
   * @returns ค่า book ทั้งหมดจาก json
   */
  readBooks(): Observable<Book[]> {
    return this.fs.readJSONFile(this.bookJsonFile);
  }

  readBooksPromise() {
    return this.fs.readJSONFilePromise(this.bookJsonFile);
  }

  writeBooks(data: { [key: string]: any }): Observable<void> {
    return this.fs.writeJSONfile(this.bookJsonFile, data);
  }

  findBookById(id: number) {
    return this.readBooks().pipe(
      map((list) => {
        const found = list.find((book) => book.bookId === Number(id));
        if (!found) {
          throw new HttpException('not found', HttpStatus.NOT_FOUND);
          // return null;
        }
        return found;
      }),
    );
  }

  deleteBookById(id: number) {
    return this.readBooks().pipe(
      switchMap((list) => {
        const index = list.findIndex((book) => book.bookId === Number(id));
        if (index > -1) {
          list.splice(index, 1);
          return this.writeBooks(list).pipe(map(() => ({ success: true })));
          // throw new HttpException('not found', HttpStatus.NOT_FOUND);
          // return null;
        }
        return of({ success: true });
      }),
    );
  }

  persistBook(book: Book) {
    return this.readBooks().pipe(
      switchMap((list) => {
        const index = list.findIndex((b) => b.bookId === book.bookId);
        if (index > -1) {
          list.splice(index, 1, book);
        } else {
          list.push(book);
        }
        return this.writeBooks(list).pipe(map(() => ({ success: true })));
      }),
    );
  }
}
