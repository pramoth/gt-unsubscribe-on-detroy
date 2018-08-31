# gt-unsubscribe-on-detroy
Unsubscribe Angular component when OnDetroy.ngOnDetroy() was call.
##installation
```sh
npm install --save gt-unsubscribe-on-detroy
```
##Usage
```ts
import { untilDestroyed } from 'gt-unsubscribe-on-detroy';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit, OnDestroy {
  ngOnInit() {
    interval(1000)
      .pipe(unsubscribeOnDetroy(this)) //Typesafe!! this must be instance of OnDestroy
      .subscribe(e => console.log(e));
      
      interval(1000)
      .pipe(unsubscribeOnDetroy(this)) //Can use many times as you want.
      .subscribe(e => console.log(e));
  }
  
  ngOnDestroy() {
    // it will be unsunscribe by Subject.takeUtil after this method call
  }
}
```
