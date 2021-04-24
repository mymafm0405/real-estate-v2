import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GeneralService {

  constructor(private http: HttpClient) {}

  addNewData(target: string, data: any) {
    return this.http
      .post(
        'https://real-estate-v1-default-rtdb.firebaseio.com/' +
          target +
          '.json',
        data
      )
  }

  getArrayOfData(target: string) {
    return this.http
      .get(
        'https://real-estate-v1-default-rtdb.firebaseio.com/' + target + '.json'
      )
      .pipe(
        map((resData) => {
          const res = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              res.push({ ...resData[key], id: key });
            }
          }
          return res;
        })
      )
  }

  patchCurrentData(target: string, id: string, newData: any) {
    return this.http
      .patch(
        'https://real-estate-v1-default-rtdb.firebaseio.com/' +
          target +
          '/' +
          id +
          '.json',
        newData
      )
  }
}
