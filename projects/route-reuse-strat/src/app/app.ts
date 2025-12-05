import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div>{{ count() }}</div>
    <div>{{ doubleCount() }}</div>
    <button (click)="increment()">Increment</button>
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('route-reuse-strat');
  readonly count = signal(0);
  readonly doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update((c) => c + 1);
  }
}
