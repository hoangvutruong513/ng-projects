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

@Component({
  selector: 'app-pokemon-summary',
  imports: [RouterLink],
  template: `
    <section
      class="rounded-md border-2 border-amber-500 bg-green-400 p-2 text-2xl text-black"
    >
      <div class="text-base text-violet-500">{{ pokeQuery.data()?.name }}</div>
    </section>
    <a
      class="cursor-pointer rounded-xl bg-green-400 p-4"
      [routerLink]="['../', previousLink()]"
    >
      Previous Pokemon
    </a>
    <a
      class="cursor-pointer rounded-xl bg-green-400 p-4"
      [routerLink]="['../', nextLink()]"
    >
      Next Pokemon
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonSummary {
  httpClient = inject(HttpClient);
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
            .get<{ name: string }>(`/api/hello/${queryKey[1]}`)
            .pipe(takeUntil(abort$)),
        );
      },
      staleTime: Infinity,
    };
  });
}
