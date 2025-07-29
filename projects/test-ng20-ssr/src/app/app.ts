import { DatePipe, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  makeStateKey,
  PLATFORM_ID,
  signal,
  TransferState,
} from '@angular/core';
import { signalState } from '@ngrx/signals';
import {
  dehydrate,
  DehydratedState,
  hydrate,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

export const delayAsync = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

const stateKey = makeStateKey<DehydratedState>('tsquery');

// const withPerson = () =>
//   signalStoreFeature(
//     withState({
//       name: 'vu',
//       age: 10,
//     }),
//     withComputed((store) => ({
//       isAdult: computed(() => store.age() >= 18),
//     })),
//     withMethods((store) => ({
//       setAge: (age: number) => {
//         patchState(store, { age });
//       },
//     })),
//   );

// const PersonStore = signalStore(withPerson());

// type A = InstanceType<typeof PersonStore>;
// type B = ReturnType<typeof withPerson>;
// type C = ReturnType<B>;

// type D = C['stateSignals'];

@Component({
  selector: 'app-root',
  imports: [DatePipe],
  template: `
    <div class="bg-amber-500 text-black">
      {{ title() }}
    </div>
    <div class="bg-amber-800 text-white">{{ timer() }}</div>
    <button
      class="cursor-pointer rounded-xl bg-green-400 p-4"
      (click)="clicker()"
    >
      Click
    </button>
    <section
      class="rounded-md border-2 border-amber-500 bg-green-400 p-2 text-2xl text-black"
    >
      <!-- <div class="text-base text-gray-500">
        {{ pokeResource.value()?.name }}
      </div> -->
      <div class="text-base text-violet-500">{{ pokeQuery.data()?.name }}</div>
    </section>
    <div>{{ getTime() | date: 'medium' }}</div>
  `,
  // providers: [PersonStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  platformId = inject(PLATFORM_ID);
  appRef = inject(ApplicationRef);
  transferState = inject(TransferState);
  httpClient = inject(HttpClient);
  queryClient = inject(QueryClient);
  // personStore = inject(PersonStore);

  pokeQuery = injectQuery(() => ({
    queryKey: ['pokemon'],
    queryFn: async () => {
      const pokemon = await lastValueFrom(
        this.httpClient.get<{ name: string }>('/api/hello'),
      );
      return pokemon;
    },
  }));

  person = signalState({
    name: 'vu',
    age: 10,
  });

  // zz = watchState(this.personStore, (state) => {
  //   console.log({ name: state.name, age: state.age });
  // });

  constructor() {
    if (isPlatformServer(this.platformId)) {
      this.transferState.onSerialize(stateKey, () =>
        dehydrate(this.queryClient),
      );
    } else {
      const dehydratedState = this.transferState.get(stateKey, null);
      hydrate(this.queryClient, dehydratedState);
    }
  }
  // pokeResource = httpResource<{ name: string }>(() => '/api/hello');
  z = this.appRef.isStable.subscribe((stable) => {
    console.log({ stableFromObservable: stable });
  });
  getTime() {
    console.log('detected');
    return new Date();
  }
  readonly title = signal('test-ng20-ssr');
  readonly timer = signal(2);
  readonly timerX3 = signal(1);
  readonly timerX6 = signal(1);

  a = effect(() => {
    const timerX3 = this.timerX3();
    console.log('effect a', { timerX3 });
    if (timerX3 % 3 !== 0) {
      this.timerX3.set(timerX3 + 1);
    }
  });

  b = effect(() => {
    const timerX3 = this.timerX3();
    this.timerX6.set(timerX3 * 2);
    console.log('effect b', { timerX3, timerX6: this.timerX6() });
  });

  async clicker() {
    console.log('clicker starts');
    this.timerX3.set(this.timerX3() + 1);
    await this.appRef.whenStable();
    console.log('x3', this.timerX3());
    console.log('x6', this.timerX6());
    console.log('clicker ends');
  }

  // qqq = afterRenderEffect(() => {
  //   setInterval(() => {
  //     this.timer.update((v) => v + 1);
  //   }, 5000);
  // });

  // qq = setInterval(() => {
  //   this.timer.update((v) => v + 1);
  //   console.log('timer', this.timer());
  // }, 5000);
}
