import { RouterReducerState } from '@ngrx/router-store';

import { RouterStateUrl } from '@shared/models';

/**
 * We treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
}
