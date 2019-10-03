import { Params, UrlSegment } from '@angular/router';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
  urlSegments: UrlSegment[];
}
