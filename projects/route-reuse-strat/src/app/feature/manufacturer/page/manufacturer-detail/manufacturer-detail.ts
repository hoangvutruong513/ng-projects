import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  linkedSignal,
  resource,
  signal,
  untracked,
} from '@angular/core';
import {
  Field,
  form,
  required,
  SchemaPath,
  SchemaPathTree,
  validate,
} from '@angular/forms/signals';

import { createManufacturer, Manufacturer } from '../../model/manufacturer';
import { ManufacturerStore } from '../../store/manufacturer.store';

const countryValidation = (field: SchemaPath<string>, country: string[]) => {
  validate(field, (context) => {
    if (!country.includes(context.value())) {
      return {
        kind: 'countryValidation',
        message: `Country must be one of ${country.join(', ')}`,
      };
    }
    return null;
  });
};

const countryFoundedYearValidation = (
  schema: SchemaPathTree<Manufacturer>,
  year: number,
) => {
  validate(schema.foundedYear, (ctx) => {
    const currentFoundedYear = ctx.value();
    const country = ctx.valueOf(schema.country);
    if (country === 'Vietnam' && currentFoundedYear < year) {
      return {
        kind: 'foundedYearValidation',
        message: `Founded year must be from ${year} onwards for Vietnam manufacturers`,
      };
    }
    return null;
  });
};

const loadManufacturer = () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        createManufacturer({
          name: 'Acme Corp',
          country: 'Vietnam',
          website: 'https://www.acmecorp.com',
          email: '',
          phone: '+84123456789',
        }),
      );
    }, 2000);
  }) as Promise<Manufacturer>;
};

@Component({
  selector: 'app-manufacturer-detail',
  imports: [Field, JsonPipe],
  templateUrl: './manufacturer-detail.html',
  providers: [ManufacturerStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManufacturerDetail {
  // manufacturerStore = inject(ManufacturerStore);

  // manufacturerModel = this.manufacturerStore.manufacturerModel;
  // manufacturerForm = this.manufacturerStore.manufacturerForm;

  manufacturerResource = resource({
    loader: () => loadManufacturer(),
  });

  readonly manufacturerModel = linkedSignal(() => {
    const apiManufacturer = this.manufacturerResource.value();
    if (!apiManufacturer) {
      return createManufacturer();
    }
    return apiManufacturer;
  });

  manufacturerForm = form(this.manufacturerModel, (schema) => {
    // readonly(schema);
    // readonly(schema.email, () => false);
    required(schema.email, { message: 'This field is required' });
    countryValidation(schema.country, ['Singapore', 'Vietnam', 'USA']);
    countryFoundedYearValidation(schema, 2005);
  });

  readonly newReview = signal('');

  patchForm() {
    this.manufacturerModel.set(
      createManufacturer({
        reviews: ['First Review', 'Second Review', 'Third Review'],
      }),
    );
  }

  addReview() {
    this.manufacturerForm
      .reviews()
      .value.update((current) => [...current, this.newReview()]);
  }

  a = effect(() => {
    const country = this.manufacturerForm.country().value();
    untracked(() => {
      if (country === 'Vietnam') this.manufacturerForm.phone().value.set('+84');
    });
  });
}
