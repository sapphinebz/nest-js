import * as fs from 'fs';
// import { fs } from 'fs'
import { Observable } from 'rxjs';
import { Book } from './book/book';
export const fs$ = {
  readJSONFile(path: string) {
    return new Observable<Book[]>((observer) => {
      fs.readFile(`${path}`, 'utf8', (err, jsonString) => {
        if (err) {
          observer.error(err);
          return;
        }
        observer.next(JSON.parse(jsonString));
        observer.complete();
      });
    });
  },
  writeJSONfile(path: string, data: { [key: string]: any }) {
    return new Observable<void>((observer) => {
      fs.writeFile(`${path}`, JSON.stringify(data), 'utf-8', function (err) {
        if (err) {
          observer.error(err);
        }
        observer.next();
        observer.complete();
      });
    });
  },
};
