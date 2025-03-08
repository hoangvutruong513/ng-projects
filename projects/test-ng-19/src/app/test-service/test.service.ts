import { inject, Injectable, InjectionToken } from '@angular/core';

import { Test2Service, Test3Service } from './test2.service';

export const TOKEN1 = new InjectionToken<TestService>('TOKEN1');

@Injectable()
export class TestService {
  test2 = inject(Test2Service);
  test3 = inject(Test3Service);
}
