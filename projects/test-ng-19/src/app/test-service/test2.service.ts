import { inject, Injectable, InjectionToken } from '@angular/core';

export const TOKEN2 = new InjectionToken<Test2Service>('TOKEN2');

@Injectable()
export class Test2Service {
  static id = 0;
  test3 = inject(Test3Service);

  constructor() {
    Test2Service.id++;
    console.log('test 2 constructed', Test2Service.id);
  }
}

@Injectable()
export class Test3Service {
  static id = 0;

  constructor() {
    Test3Service.id++;
    console.log('test 3 constructed', Test3Service.id);
  }
}
