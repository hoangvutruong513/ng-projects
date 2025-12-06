import { signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { signalStore, withProps } from '@ngrx/signals';

import { createManufacturer } from '../model/manufacturer';

export const ManufacturerStore = signalStore(
  withProps(() => {
    const manufacturerModel = signal(createManufacturer());
    const manufacturerForm = form(manufacturerModel);
    return {
      manufacturerModel,
      manufacturerForm,
    };
  }),
);
