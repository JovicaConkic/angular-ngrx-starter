import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { EMPTY, Observable, Operator } from 'rxjs';

/**
 * MockObservable is used when we need to pass observable somewhere
 * and than set what should be returned and how.
 * Source can even be rxjs marble
 */
export class MockObservable<T> extends Observable<T> {
  public source: Observable<any> = EMPTY;

  /**
   * Overriding lift function mocks .pipe() function
   */
  public lift<R>(operator: Operator<T, R>): Observable<R> {
    const observable = new MockObservable<R>();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }

  /**
   * Set's source for mock observable
   */
  public setSource(source: Observable<T>): void {
    this.source = source;
  }
}

@Injectable()
export class MockActions<T> extends Actions {
  public source: Observable<any>;

  constructor() {
    super(EMPTY);
  }

  public setSource(source: Observable<T>): void {
    this.source = source;
  }
}

/**
 * A mock implementation of {@link NgZone}.
 */
@Injectable()
export class MockNgZone extends NgZone {
  public onStable: EventEmitter<any> = new EventEmitter(false);

  constructor() {
    super({ enableLongStackTrace: false });
  }

  public run(fn: Function): any {
    return fn();
  }

  public runOutsideAngular(fn: Function): any {
    return fn();
  }

  public simulateZoneExit(): void {
    this.onStable.emit(null);
  }
}

/**
 * Mocks store as actual observable
 */
export class StoreAsObservable extends Observable<any> {
  public dispatch: jest.Mock = jest.fn();
}

/**
 * Mocks store with all methods
 * Allows passing state on start
 */
export class StoreMock {
  public dispatch: jest.Mock<any> = jest.fn();

  public static of(state: Observable<any>): StoreMock {
    return new StoreMock(state);
  }

  public pipe: any = (...args) => {
    return (this.state as any).pipe(...args);
  };

  constructor(private state: Observable<any> = EMPTY) {}
}

export class MockHttp {
  public getSource: MockObservable<any> = new MockObservable();
  public get: jest.Mock<any> = jest.fn().mockReturnValue(this.getSource);

  public postSource: MockObservable<any> = new MockObservable();
  public post: jest.Mock<any> = jest.fn().mockReturnValue(this.postSource);

  public requestSource: MockObservable<any> = new MockObservable();
  public request: jest.Mock<any> = jest.fn().mockReturnValue(this.requestSource);
}
