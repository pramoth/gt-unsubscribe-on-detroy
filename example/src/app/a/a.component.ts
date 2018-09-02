import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { unsubscribeOnDetroy } from 'gt-unsubscribe-on-detroy';

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css']
})
export class AComponent implements OnInit, OnDestroy {

  constructor(private singletonService: MyServiceService) { }

  ngOnInit() {
    this.singletonService.mySubject.pipe(unsubscribeOnDetroy(this))
    .subscribe(e => console.log( e + ' on component A'));
    // always print 1 because of no leak
    console.log('this.singletonService.mySubject.observers.length=' + this.singletonService.mySubject.observers.length);
  }
  ngOnDestroy(): void {
    console.log('AComponent  destroyed.');
  }

}
