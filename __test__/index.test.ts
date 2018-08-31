import {OnDestroy} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';

import {TakeUtilSubjectType} from '../src/__type';
import {unsubscribeOnDetroy} from '../src/index';

describe('unsubscribeAfterDetroy', () => {
  const mockObserver = {next: jest.fn(), error: jest.fn(), complete: jest.fn()};

  let sut: OnDestroy&TakeUtilSubjectType;

  beforeEach(() => {
    sut = {
      ngOnDestroy() {

      },
      __takeUtilSubject__: undefined
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should emit 1 time when call ngOnDestroy()', () => {
    new Subject().asObservable().pipe(unsubscribeOnDetroy(sut)).subscribe();
    sut.__takeUtilSubject__!.subscribe(mockObserver);
    sut.ngOnDestroy();
    expect(mockObserver.next).toHaveBeenCalledTimes(1);
    expect(mockObserver.complete).toHaveBeenCalledTimes(1);
  });

  test('unsubscribeAfterDetroy 2 time then it should emit 1 time when call ngOnDestroy()', () => {
    new Subject().asObservable().pipe(unsubscribeOnDetroy(sut)).subscribe();
    new Subject().asObservable().pipe(unsubscribeOnDetroy(sut)).subscribe();
    sut.__takeUtilSubject__!.subscribe(mockObserver);
    sut.ngOnDestroy();
    expect(mockObserver.next).toHaveBeenCalledTimes(1);
    expect(mockObserver.complete).toHaveBeenCalledTimes(1);
  });
});
