import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-button',
  imports: [],
  template: `
    <button
      class="rounded-md bg-amber-400 p-2 hover:bg-amber-500 active:bg-amber-600"
    >
      <ng-content />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {}
