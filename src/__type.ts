import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export type FunctionReturnVoidType = 'ngOnDestroy'|'__originalDestroyMethod__'|'__wrapperDetroyMethod__';
export type TakeUtilSubjectTypeKey = '__takeUtilSubject__';
export type TakeUtilSubjectType = {
  [key in TakeUtilSubjectTypeKey]: Subject<boolean>|undefined
};
export type AngularComponentWithOnDestory = {
  [key in FunctionReturnVoidType]: () => void
}&OnDestroy&TakeUtilSubjectType;