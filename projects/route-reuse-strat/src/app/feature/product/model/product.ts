import { Manufacturer } from '../../manufacturer/model/manufacturer';

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  manufacturers: Manufacturer[];
}

export const createProduct = (partial?: Partial<Product>): Product => ({
  id: 0,
  name: '',
  description: '',
  category: '',
  price: 0,
  stock: 0,
  manufacturers: [],
  ...partial,
});
