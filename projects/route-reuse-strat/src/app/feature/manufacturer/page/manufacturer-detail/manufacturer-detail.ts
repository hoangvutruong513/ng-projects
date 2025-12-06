import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Field } from '@angular/forms/signals';

import { ManufacturerStore } from '../../store/manufacturer.store';

@Component({
  selector: 'app-manufacturer-detail',
  imports: [Field, JsonPipe],
  template: `
    <section class="rounded-md bg-white p-2">
      <h2 class="mb-2 text-lg font-bold">Manufacturer Form</h2>
      <section class="grid grid-cols-3 gap-2">
        <div>
          <label
            for="manufacturerName"
            class="block text-sm/6 font-medium text-gray-900"
            >Manufacturer Name</label
          >
          <div class="mt-2">
            <input
              id="manufacturerName"
              type="text"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              [field]="manufacturerForm.name"
            />
          </div>
        </div>
        <div>
          <label
            for="manufacturerCountry"
            class="block text-sm/6 font-medium text-gray-900"
            >Country</label
          >
          <div class="mt-2">
            <input
              id="manufacturerCountry"
              type="text"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              [field]="manufacturerForm.country"
            />
          </div>
        </div>
        <div>
          <label
            for="manufacturerWebsite"
            class="block text-sm/6 font-medium text-gray-900"
            >Website</label
          >
          <div class="mt-2">
            <input
              id="manufacturerWebsite"
              type="text"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              [field]="manufacturerForm.website"
            />
          </div>
        </div>
        <div>
          <label
            for="manufacturerEmail"
            class="block text-sm/6 font-medium text-gray-900"
            >Email</label
          >
          <div class="mt-2">
            <input
              id="manufacturerEmail"
              type="email"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              [field]="manufacturerForm.email"
            />
          </div>
        </div>
        <div>
          <label
            for="manufacturerPhone"
            class="block text-sm/6 font-medium text-gray-900"
            >Phone</label
          >
          <div class="mt-2">
            <input
              id="manufacturerPhone"
              type="tel"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              [field]="manufacturerForm.phone"
            />
          </div>
        </div>
        <div>
          <label
            for="manufacturerFoundedYear"
            class="block text-sm/6 font-medium text-gray-900"
            >Founded Year</label
          >
          <div class="mt-2">
            <input
              id="manufacturerFoundedYear"
              type="number"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              [field]="manufacturerForm.foundedYear"
            />
          </div>
        </div>
        <div class="col-span-3">
          <label
            for="manufacturerDescription"
            class="block text-sm/6 font-medium text-gray-900"
            >Description</label
          >
          <div class="mt-2">
            <textarea
              id="manufacturerDescription"
              rows="3"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              [field]="manufacturerForm.description"
            ></textarea>
          </div>
        </div>
      </section>
    </section>
    <pre>
      {{ manufacturerModel() | json }}
    </pre
    >
  `,
  providers: [ManufacturerStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManufacturerDetail {
  manufacturerStore = inject(ManufacturerStore);

  manufacturerModel = this.manufacturerStore.manufacturerModel;
  manufacturerForm = this.manufacturerStore.manufacturerForm;
}
