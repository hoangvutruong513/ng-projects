import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  getState,
  patchState,
  signalStore,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

export const delayAsync = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

const withPerson = () =>
  signalStoreFeature(
    withState({
      name: 'vu',
      age: 10,
      test: signal('test'),
    }),
    withComputed((store) => ({
      isAdult: computed(() => store.age() >= 18),
    })),
    withMethods((store) => ({
      setAge: (age: number) => {
        patchState(store, { age });
      },
    })),
  );

const PersonStore = signalStore({ protectedState: false }, withPerson());
const RecordStore = signalStore(
  withState({ test: {} as Record<string, string> }),
  withMethods((store) => ({
    setTest: (newTest: Record<string, string>) => {
      patchState(store, (state) => ({
        test: { ...state.test, ...newTest },
      }));
    },
  })),
);

@Component({
  selector: 'app-root',
  imports: [DatePipe, RouterOutlet],
  template: `
    <section class="grid grid-cols-1 gap-2">
      <section class="rounded-lg border-2 border-blue-600 bg-gray-100 p-2">
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
        <button
          class="cursor-pointer rounded-xl bg-green-400 p-4"
          (click)="clicker2()"
        >
          Click2
        </button>
        <button
          class="cursor-pointer rounded-xl bg-green-400 p-4"
          (click)="clicker3()"
        >
          Click3
        </button>
        <div>{{ getTime() | date: 'medium' }}</div>
      </section>
      <section
        class="flex flex-row gap-2 rounded-lg border-2 border-blue-600 bg-gray-100 p-2"
      >
        <button
          class="cursor-pointer rounded-xl bg-green-400 p-4"
          (click)="loginCmd.mutate()"
        >
          Login MOFO
        </button>
        <button
          class="cursor-pointer rounded-xl bg-green-400 p-4"
          (click)="readCookie()"
        >
          read cookie
        </button>
      </section>
      <section class="rounded-lg border-2 border-blue-600 bg-gray-100 p-2">
        <router-outlet />
      </section>
    </section>
  `,
  providers: [PersonStore, RecordStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  appRef = inject(ApplicationRef);
  personStore = inject(PersonStore);
  recordStore = inject(RecordStore);
  httpClient = inject(HttpClient);
  loginCmd = injectMutation(() => ({
    mutationFn: () =>
      lastValueFrom(this.httpClient.post<string>('/api/login', {})),
    onSuccess: (data) => {
      console.log('Logged In!', data);
    },
  }));
  readonly pokemonId = signal(1);

  testEffect = effect(() => {
    console.log(this.personStore.test()());
  });

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

  clicker2() {
    this.personStore.test().update((val) => val + '2');
  }

  clicker3() {
    console.log('before', getState(this.recordStore));
    console.log(this.recordStore.test()['nani']);
    this.recordStore.setTest({ nani: 'what the nani' });
    console.log('after', getState(this.recordStore));
    console.log(this.recordStore.test()['nani']);
  }

  readCookie() {
    console.log(document.cookie);
  }
}
