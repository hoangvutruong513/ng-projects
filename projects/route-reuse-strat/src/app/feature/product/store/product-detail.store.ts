import { signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { signalStore, withProps } from '@ngrx/signals';

import { createProduct } from '../model/product';

export const ProductDetailStore = signalStore(
  withProps(() => {
    const productModel = signal(createProduct());
    const productForm = form(productModel);
    return {
      productModel,
      productForm,
    };
  }),
);
