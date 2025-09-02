import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { fromEvent, lastValueFrom, takeUntil } from 'rxjs';

import { CookieService } from '../cookie-service';

@Component({
  selector: 'app-pokemon-summary',
  imports: [RouterLink],
  template: `
    <section class="grid grid-cols-1 justify-items-start gap-2 text-white">
      <section
        class="justify-self-stretch rounded-md border-2 border-amber-500 bg-green-400 p-2 text-2xl text-black"
      >
        <div class="text-base text-violet-500">
          {{ pokeQuery.data()?.name }}
        </div>
      </section>
      <section class="flex flex-row gap-2">
        <a
          class="cursor-pointer rounded-xl bg-green-400 p-2"
          [routerLink]="['../', previousLink()]"
        >
          Previous Pokemon
        </a>
        <a
          class="cursor-pointer rounded-xl bg-green-400 p-2"
          [routerLink]="['../', nextLink()]"
        >
          Next Pokemon
        </a>
      </section>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonSummary {
  httpClient = inject(HttpClient);
  cookieService = inject(CookieService);
  constructor() {
    console.log(this.cookieService.getRequestCookie());
  }
  readonly id = input(1, {
    transform: numberAttribute,
  });
  readonly previousLink = computed(() => {
    const id = this.id();
    return id === 1 ? id : id - 1;
  });
  readonly nextLink = computed(() => {
    return this.id() + 1;
  });
  pokeQuery = injectQuery(() => {
    const id = this.id();
    return {
      enabled: !!(id && id > 0),
      queryKey: ['pokemon', id],
      queryFn: async ({ queryKey, signal }) => {
        const abort$ = fromEvent(signal, 'abort');
        return lastValueFrom(
          this.httpClient
            .get<{
              name: string;
            }>(`https://pokeapi.co/api/v2/pokemon/${queryKey[1]}`)
            .pipe(takeUntil(abort$)),
        );
      },
      staleTime: Infinity,
    };
  });
}
