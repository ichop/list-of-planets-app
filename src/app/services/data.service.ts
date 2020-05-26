import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';



@Injectable()
export class DataService {

  private cache: Map<string, Observable<any>> = new Map<string, Observable<any>>();

  constructor(public http: HttpClient) {
  }


  public get(url: string) {
    if (this.hasValidCachedValue(url)) {
      console.log(`%c Getting from cache ${url}`, 'color: green');
      return this.cache.get(url);
    }
    console.log(`%c Getting from api ${url}`, 'color: red');
    const response: Observable<any> = this.http.get(`http://localhost:8080/api/planets${url}`);
    this.cache.set(url, response);

    return this.cache.get(url);
  }


  private hasValidCachedValue(key: string): boolean {
    return this.cache.has(key);
  }
}
