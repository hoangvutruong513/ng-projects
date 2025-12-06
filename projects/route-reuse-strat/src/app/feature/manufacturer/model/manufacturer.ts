export interface Manufacturer {
  id: number;
  name: string;
  country: string;
  website: string;
  email: string;
  phone: string;
  foundedYear: number;
  description: string;
}

export function createManufacturer(
  partial?: Partial<Manufacturer>,
): Manufacturer {
  return {
    id: 0,
    name: 'Whate',
    country: 'Singapore',
    website: 'https://www.acme.com',
    email: '',
    phone: '',
    foundedYear: new Date().getFullYear(),
    description: '',
    ...partial,
  };
}
