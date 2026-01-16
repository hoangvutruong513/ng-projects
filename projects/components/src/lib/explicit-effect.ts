import {
  effect,
  EffectCleanupRegisterFn,
  Signal,
  signal,
  untracked,
} from '@angular/core';

export const explicitEffect = <const T extends readonly Signal<unknown>[]>(
  deps: T,
  effectFn: (
    args: { [K in keyof T]: ReturnType<T[K]> },
    onCleanup: EffectCleanupRegisterFn,
  ) => void,
  isEnabled = signal(true),
) => {
  const effectRef = effect((onCleanup) => {
    const depArr = deps.map((dep) => dep()) as {
      [K in keyof T]: ReturnType<T[K]>;
    };
    untracked(() => {
      if (isEnabled()) {
        effectFn(depArr, onCleanup);
      }
    });
  });
  return {
    effectRef,
    enable: () => {
      isEnabled.set(true);
    },
    disable: () => {
      isEnabled.set(false);
    },
    toggle: () => {
      isEnabled.update((v) => !v);
    },
  };
};
