import { DatePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';

export const delayAsync = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

@Component({
  selector: 'app-root',
  imports: [DatePipe],
  template: `
    <div class="bg-orange-200 text-blue-400">{{ title() }}</div>
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
      <div class="text-base">
        {{ hello.value()?.name }}
      </div>
    </section>
    <div>{{ getTime() | date: 'medium' }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  appRef = inject(ApplicationRef);
  hello = httpResource<{ name: string }>(() => '/api/hello');
  z = this.appRef.isStable.subscribe((stable) => {
    console.log({ stable });
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

  clicker() {
    console.log('clicker starts');
    this.timerX3.set(this.timerX3() + 1);
    this.appRef.tick();
    console.log('x3', this.timerX3());
    console.log('x6', this.timerX6());
    console.log('clicker ends');
    // await this.appRef.whenStable();
    // console.log('x3', this.timerX3());
    // console.log('x6', this.timerX6());
    // console.log('clicker ends');
    // void this.appRef.whenStable().then(() => {
    //   console.log('x3', this.timerX3());
    //   console.log('x6', this.timerX6());
    //   console.log('clicker ends');
    // });
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
