import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import {
  applyWhen,
  Field,
  form,
  required,
  schema,
  SchemaPath,
  validate,
  validateTree,
} from '@angular/forms/signals';
import { explicitEffect } from 'components';

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

const closedYearValidation = schema<Manufacturer>((schema) => {
  required(schema.closedYear, {
    message: 'Closed year is required if manufacturer is closed',
  });
  validateTree(schema, (ctx) => {
    const closedYear = ctx.fieldTree.closedYear().value();
    const foundedYear = ctx.fieldTree.foundedYear().value();
    if (foundedYear === null || closedYear === null) {
      return null;
    }
    if (closedYear <= foundedYear) {
      return {
        kind: 'closedYearValidation',
        fieldTree: ctx.fieldTree.closedYear,
        message: `Closed year must be after founded year`,
      };
    }
    return null;
  });
});

const manufacturerSchema = schema<Manufacturer>((schema) => {
  required(schema.name, { message: 'This field is required' });
  required(schema.email, { message: 'This field is required' });
  countryValidation(schema.country, ['Singapore', 'Vietnam', 'USA']);
  applyWhen(
    schema,
    (ctx) => ctx.valueOf(schema.isClosed),
    closedYearValidation,
  );
});

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
  imports: [JsonPipe, Field],
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

  manufacturerForm = form(this.manufacturerModel, manufacturerSchema);

  readonly newReview = signal('');

  patchForm() {
    this.manufacturerModel.set(createManufacturer());
  }

  a = explicitEffect([this.manufacturerForm.country().value], ([country]) => {
    if (country === 'Vietnam') this.manufacturerForm.phone().value.set('+84');
  });

  b = explicitEffect([this.manufacturerForm.country().value], ([country]) => {
    console.log({ country });
  });
}
