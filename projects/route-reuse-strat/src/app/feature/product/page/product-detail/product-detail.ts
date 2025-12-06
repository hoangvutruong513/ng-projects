import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

import { ProductDetailStore } from '../../store/product-detail.store';

@Component({
  selector: 'app-product-detail',
  imports: [Field, RouterLink],
  template: `
    <section class="grid grid-cols-1 gap-8 py-4">
      <section>
        <h2 class="mb-2 text-lg font-bold">Product</h2>
        <section class="grid grid-cols-3 gap-2">
          <div>
            <label
              for="productName"
              class="block text-sm/6 font-medium text-gray-900"
              >Product Name</label
            >
            <div class="mt-2">
              <input
                id="productName"
                type="text"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                [field]="productForm.name"
              />
            </div>
          </div>
          <div>
            <label
              for="productDescription"
              class="block text-sm/6 font-medium text-gray-900"
              >Description</label
            >
            <div class="mt-2">
              <input
                id="productDescription"
                type="text"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                [field]="productForm.description"
              />
            </div>
          </div>
          <div>
            <label
              for="productCategory"
              class="block text-sm/6 font-medium text-gray-900"
              >Category</label
            >
            <div class="mt-2">
              <input
                id="productCategory"
                type="text"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                [field]="productForm.category"
              />
            </div>
          </div>
          <div>
            <label
              for="productPrice"
              class="block text-sm/6 font-medium text-gray-900"
              >Price</label
            >
            <div class="mt-2">
              <input
                id="productPrice"
                type="number"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                [field]="productForm.price"
              />
            </div>
          </div>
          <div>
            <label
              for="productStock"
              class="block text-sm/6 font-medium text-gray-900"
              >Stock</label
            >
            <div class="mt-2">
              <input
                id="productStock"
                type="number"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                [field]="productForm.stock"
              />
            </div>
          </div>
        </section>
      </section>
      <section>
        <div class="flex justify-between mb-2 items-center">
          <h2 class="text-lg font-bold">Manufacturers</h2>
          <a
            routerLink="/manufacturer"
            class="bg-blue-400 px-2 py-1 rounded-md hover:bg-blue-600 text-white"
          >
            Add Manufacturer
          </a>
        </div>
        <ul role="list" class="divide-y divide-gray-100 grid grid-cols-1 gap-2">
          @for (
            manufacturer of productForm.manufacturers().value();
            track manufacturer
          ) {
            <li
              class="flex justify-between gap-x-6 border border-blue-300 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <div class="flex min-w-0 gap-x-4">
                <div class="min-w-0 flex-auto">
                  <p class="text-sm/6 font-semibold text-gray-900">
                    {{ manufacturer.name }}
                  </p>
                  <p class="mt-1 truncate text-xs/5 text-gray-500">
                    {{ manufacturer.website }}
                  </p>
                </div>
              </div>
              <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p class="text-sm/6 text-gray-900">
                  {{ manufacturer.country }}
                </p>
                <p class="mt-1 text-xs/5 text-gray-500">
                  {{ manufacturer.foundedYear }}
                </p>
              </div>
            </li>
          }
        </ul>
      </section>
    </section>
  `,
  providers: [ProductDetailStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  productDetailStore = inject(ProductDetailStore);

  productModel = this.productDetailStore.productModel;
  productForm = this.productDetailStore.productForm;
}
