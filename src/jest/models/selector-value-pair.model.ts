import { Selector } from '@ngrx/store';
import { Observable } from 'rxjs';

/**
 * Describes pair of selector and which value it should return as observable
 */
export interface SelectorValuePair<T> {
  selector: Selector<any, T>;
  value: Observable<T>;
}
