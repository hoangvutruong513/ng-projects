import {
  inject,
  Injectable,
  PLATFORM_ID,
  REQUEST,
  RESPONSE_INIT,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  platformId = inject(PLATFORM_ID);
  request = inject(REQUEST, { optional: true });
  responseInit = inject(RESPONSE_INIT, { optional: true });

  constructor() {
    console.log({
      request: this.request,
      responseInit: this.responseInit,
    });
  }

  getRequestCookie() {
    return this.request?.headers.get('cookie') ?? '';
  }
}
