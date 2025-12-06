import { signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { signalStore, withProps } from '@ngrx/signals';

export const ProductDetailStore = signalStore(
  withProps(() => {
    const productModel = signal({
      name: '',
      description: '',
      category: '',
      price: 0,
      stock: 0,
    });
    const productForm = form(productModel);
    return {
      productModel,
      productForm,
    };
  }),
);
