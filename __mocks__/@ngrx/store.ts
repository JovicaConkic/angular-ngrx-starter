import { of } from 'rxjs';

import { mockPart } from '@jest/utils';

const select = jest.fn(() => of({}));

module.exports = mockPart('@ngrx/store', {
  select
});
