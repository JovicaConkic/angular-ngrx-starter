import { select, Selector } from '@ngrx/store';
import Ralways from 'ramda/es/always';
import Rcond from 'ramda/es/cond';
import Ridentical from 'ramda/es/identical';
import Rmap from 'ramda/es/map';
import { Observable } from 'rxjs';

import { SelectorValuePair } from '../models/';

/**
 * Makes function a mock in context of its type
 * @param mock function to make mock of
 */
const asMockFunction = (mock: Function): jest.Mock => mock as jest.Mock;

/**
 * Mocks select to call pickValue function to return value for certain selector
 * @param pickValue function that will return value for passed selector
 */
const mockSelectToReturnValue = (pickValue: (s: Selector<any, any>) => Observable<any>) => {
  asMockFunction(select).mockImplementation(selector => () => pickValue(selector));
};

/**
 * Returns not mocked module by the path
 * @param packagePath path ('@ngrx/store' etc.)
 */
export const getActualModule = (packagePath: string) => jest.requireActual(packagePath);

/**
 * Returns module parts and mocks only some of them
 * @param packagePath path ('@ngrx/store' etc.)
 * @param mockedPairs pairs to mock ({'select': jest.fn()} etc.)
 */
export const mockPart = (packagePath: string, mockedPairs: { [key: string]: any }) => ({
  ...getActualModule(packagePath),
  ...mockedPairs
});

/**
 * Mocks select operator to return values observables based on selector
 * IMPORTANT! You need to mock `select` in `__mocks__/@ngrx/store.ts` for this to work.
 * See Readme.md of `@ryanair/test-helpers` for more info
 * @param selectorValuePairs pairs of selector and values that need to be returned
 */
export const mockSelect = (selectorValuePairs: Array<SelectorValuePair<any>>): void => {
  const convertToConditionalPairs = pair => [Ridentical(pair.selector), Ralways(pair.value)];

  const pickValue = Rcond(Rmap(convertToConditionalPairs)(selectorValuePairs));

  mockSelectToReturnValue(pickValue);
};

/**
 * Clears select mock. Should be called preferably in afterEach function
 */
export const clearSelectMock = () => asMockFunction(select).mockReset();
