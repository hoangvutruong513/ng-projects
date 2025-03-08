import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';

import { Test2Service } from '../test-service/test2.service';

@Component({
  selector: 'app-dynamic-content-projection',
  imports: [],
  styles: `
    :host {
      display: block;
      margin-top: 16px;
      margin-bottom: 16px;
    }
  `,
  template: `
    <div style="background: pink; color: white; padding: 16px">
      <ng-content slot="h1" />
    </div>
    <div style="background: purple; color: white; padding: 16px">
      <ng-content select="span" />
    </div>
    <div style="background: brown; color: white; padding: 16px">
      <ng-content select="h2" />
    </div>
    <div>{{ input1() }}</div>
    <div>{{ input2() }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicContentProjectionComponent implements OnInit {
  input1 = input();
  input2 = input();
  test2 = inject(Test2Service);
  ngOnInit(): void {
    console.log('Dynamic Content Projection Component OnInit', this.test2);
    console.log(Test2Service.id);
    console.log('fuck yeah');
  }
}
