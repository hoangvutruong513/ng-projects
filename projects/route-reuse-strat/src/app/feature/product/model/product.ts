export interface Product {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
}

export const createProduct = (): Product => ({
  name: '',
  description: '',
  category: '',
  price: 0,
  stock: 0,
});
