import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Field } from '@angular/forms/signals';

import { ProductDetailStore } from '../../store/product-detail.store';

@Component({
  selector: 'app-product-detail',
  imports: [Field, JsonPipe],
  template: `
    <section class="rounded-md bg-white p-2">
      <h2 class="mb-2 text-lg font-bold">Product Form</h2>
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
    <pre>
      {{ productModel() | json }}
    </pre
    >
  `,
  providers: [ProductDetailStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  productDetailStore = inject(ProductDetailStore);

  productModel = this.productDetailStore.productModel;
  productForm = this.productDetailStore.productForm;
}
