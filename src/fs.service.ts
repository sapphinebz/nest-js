import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Observable } from 'rxjs';
import { Book } from './book/book';

@Injectable()
export class FsService {
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
  }

  /**
   * อ่านไฟล์แบบ promise
   * @param path url ค้นหา json
   * @returns Promise<Book[]>
   */
  readJSONFilePromise(path: string) {
    return new Promise<Book[]>((resolve, reject) => {
      fs.readFile(`${path}`, 'utf8', (err, jsonString) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(JSON.parse(jsonString));
      });
    });
  }

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
  }
}
