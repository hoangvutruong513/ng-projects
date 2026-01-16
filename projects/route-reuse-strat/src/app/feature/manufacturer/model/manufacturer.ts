// export interface Address {
//   country: string;
//   city: string;
//   zipCode: string;
//   line1: string;
//   line2: string;
//   line3: string;
// }
export interface Manufacturer {
  id: number;
  name: string;
  country: string;
  website: string;
  email: string;
  phone: string;
  foundedYear: number | null;
  description: string;
  isClosed: boolean;
  closedYear: number | null;
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
    foundedYear: null,
    description: '',
    isClosed: false,
    closedYear: null,
    ...partial,
  };
}
