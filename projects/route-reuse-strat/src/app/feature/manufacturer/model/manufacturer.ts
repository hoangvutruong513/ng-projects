export interface Manufacturer {
  id: number;
  name: string;
  country: string;
  website: string;
  email: string;
  phone: string;
  foundedYear: number;
  description: string;
  reviews: string[];
}

export function createManufacturer(
  partial?: Partial<Manufacturer>,
): Manufacturer {
  return {
    id: 0,
    name: '',
    country: '',
    website: '',
    email: '',
    phone: '',
    foundedYear: new Date().getFullYear(),
    description: '',
    reviews: ['First Review'],
    ...partial,
  };
}
