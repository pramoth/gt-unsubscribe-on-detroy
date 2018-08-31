import {OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AngularComponentWithOnDestory} from './__type';

export const unsubscribeOnDetroy = (component: OnDestroy) => <T>(source: Observable<T>) => {
  const _component = component as AngularComponentWithOnDestory;
  _component.__takeUtilSubject__ = _component.__takeUtilSubject__ || new Subject<boolean>();
  _component.__originalDestroyMethod__ = _component.__originalDestroyMethod__ || _component.ngOnDestroy;
  _component.__wrapperDetroyMethod__ = _component.__wrapperDetroyMethod__ || (() => {
                                         _component.__originalDestroyMethod__.apply(_component);
                                         _component.__takeUtilSubject__!.next(true);
                                         _component.__takeUtilSubject__!.complete();
                                       });
  _component.ngOnDestroy = _component.__wrapperDetroyMethod__;
  return source.pipe(takeUntil<T>(_component.__takeUtilSubject__));
};