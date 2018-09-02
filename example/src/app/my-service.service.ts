import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  mySubject = new ReplaySubject<string>(1);
  constructor() {
    this.mySubject.next('fire value');
  }
}
