export interface Manufacturer {
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
    name: '',
    country: '',
    website: '',
    email: '',
    phone: '',
    foundedYear: new Date().getFullYear(),
    description: '',
    ...partial,
  };
}
