import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GeneralService {
  postNewDataChanged = new Subject<{ status: boolean; id: string }>();
  getDataChanged = new Subject<{ status: boolean; data: any }>();
  patchDataChanged = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  addNewData(target: string, data: any) {
    this.http
      .post(
        'https://real-estate-v1-default-rtdb.firebaseio.com/' +
          target +
          '.json',
        data
      )
      .subscribe(
        (res: { name: string }) => {
          this.postNewDataChanged.next({
            status: true,
            id: res.name,
          });
        },
        (error) => {
          console.log(error);
          this.postNewDataChanged.next({
            status: false,
            id: '',
          });
        }
      );
  }

  getArrayOfData(target: string) {
    this.http
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
      .subscribe(
        (res) => {
          this.getDataChanged.next({
            status: true,
            data: res,
          });
        },
        (error) => {
          console.log(error);
          this.getDataChanged.next({
            status: false,
            data: '',
          });
        }
      );
  }

  patchCurrentData(target: string, id: string, newData: any) {
    this.http
      .patch(
        'https://real-estate-v1-default-rtdb.firebaseio.com/' +
          target +
          '/' +
          id +
          '.json',
        newData
      )
      .subscribe(
        () => {
          this.patchDataChanged.next(true);
        },
        (error) => {
          console.log(error);
          this.patchDataChanged.next(false);
        }
      );
  }
}
