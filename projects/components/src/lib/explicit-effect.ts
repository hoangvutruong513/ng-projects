import {
  effect,
  EffectCleanupRegisterFn,
  Signal,
  signal,
  untracked,
} from '@angular/core';

type SignalTuple = readonly [...Signal<unknown>[]];
type UnwrapSignalTuple<T extends SignalTuple> = {
  [K in keyof T]: T[K] extends Signal<infer U> ? U : never;
};

export const explicitEffect = <const T extends SignalTuple>(
  deps: T,
  effectFn: (
    args: UnwrapSignalTuple<T>,
    onCleanup: EffectCleanupRegisterFn,
  ) => void,
  isEnabled = true,
) => {
  const isEnabledSignal = signal(isEnabled);
  const effectRef = effect((onCleanup) => {
    const depArr = deps.map((dep) => dep()) as UnwrapSignalTuple<T>;
    untracked(() => {
      if (isEnabledSignal()) {
        effectFn(depArr, onCleanup);
      }
    });
  });
  return {
    effectRef,
    enable: () => {
      isEnabledSignal.set(true);
    },
    disable: () => {
      isEnabledSignal.set(false);
    },
    toggle: () => {
      isEnabledSignal.update((v) => !v);
    },
  };
};
