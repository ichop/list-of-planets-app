import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class SharedService {

  constructor() {
  }

  private emitChangeSource = new Subject();
  changeEmitted$ = this.emitChangeSource.asObservable();

  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }
}
