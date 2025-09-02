import { isPlatformServer } from '@angular/common';
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

  getRequestCookie() {
    if (isPlatformServer(this.platformId)) {
      return this.request?.headers.get('cookie') ?? '';
    }
    return document.cookie;
  }
}
