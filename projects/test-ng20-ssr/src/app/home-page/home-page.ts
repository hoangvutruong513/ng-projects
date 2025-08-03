import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  template: `
    <section class="grid grid-cols-1 gap-4">
      <div class="text-3xl text-blue-400">Welcome to the PokeCenter</div>
      <a class="text-center" [routerLink]="['..', 'pokemon', 1]"
        >Visit your pokemon</a
      >
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
