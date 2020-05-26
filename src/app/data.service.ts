import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';



@Injectable()
export class DataService {

  private cache: Map<number, Observable<any>> = new Map<number, Observable<any>>();

  constructor(public http: HttpClient) {
  }


  public get(pageIndex: number) {
    if (this.hasValidCachedValue(pageIndex)) {
      console.log(`%c Getting from cache ${pageIndex}`, 'color: green');
      return this.cache.get(pageIndex);
    }
    console.log(`%c Getting from api ${pageIndex}`, 'color: red');
    const response: Observable<any> = this.http.get(`http://localhost:8080/api/planets/?page=${pageIndex}`);
    this.cache.set(pageIndex, response);

    return this.cache.get(pageIndex);
  }


  private hasValidCachedValue(key: number): boolean {
    return this.cache.has(key);
  }
}
