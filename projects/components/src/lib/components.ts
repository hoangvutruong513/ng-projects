import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-components',
  imports: [],
  template: ` <p>components works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Components {}
