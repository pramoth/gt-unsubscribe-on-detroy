import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export type FunctionReturnVoidType = {
  ngOnDestroy: () => void,
  __originalDestroyMethod__: () => void,
  __wrapperDetroyMethod__: () => void
};

export type TakeUntilSubjectType = {
  __takeUntilSubject__: Subject<boolean>|undefined
};
export type AngularComponentWithOnDestory = FunctionReturnVoidType&OnDestroy&TakeUntilSubjectType;