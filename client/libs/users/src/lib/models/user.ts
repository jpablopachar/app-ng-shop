export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  isAdmin: boolean;
  street: string;
  apartment: string;
  zip: string;
  city: string;
  country: string;
  token?: string;
}
