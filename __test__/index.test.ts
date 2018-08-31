import {OnDestroy} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';

import {TakeUntilSubjectType} from '../src/__type';
import {unsubscribeOnDetroy} from '../src/index';

describe('unsubscribeAfterDetroy', () => {
  const mockObserver = {next: jest.fn(), error: jest.fn(), complete: jest.fn()};

  let sut: OnDestroy&TakeUntilSubjectType;

  beforeEach(() => {
    sut = {
      ngOnDestroy() {

      },
      __takeUntilSubject__: undefined
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should emit 1 time when call ngOnDestroy()', () => {
    new Subject().asObservable().pipe(unsubscribeOnDetroy(sut)).subscribe();
    sut.__takeUntilSubject__!.subscribe(mockObserver);
    sut.ngOnDestroy();
    expect(mockObserver.next).toHaveBeenCalledTimes(1);
    expect(mockObserver.complete).toHaveBeenCalledTimes(1);
  });

  test('unsubscribeAfterDetroy 2 time then it should emit 1 time when call ngOnDestroy()', () => {
    new Subject().asObservable().pipe(unsubscribeOnDetroy(sut)).subscribe();
    new Subject().asObservable().pipe(unsubscribeOnDetroy(sut)).subscribe();
    sut.__takeUntilSubject__!.subscribe(mockObserver);
    sut.ngOnDestroy();
    expect(mockObserver.next).toHaveBeenCalledTimes(1);
    expect(mockObserver.complete).toHaveBeenCalledTimes(1);
  });
});
