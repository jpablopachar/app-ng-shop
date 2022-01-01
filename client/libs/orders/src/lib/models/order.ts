import { User } from "@client/users";
import { OrderItem } from "./order-item";

export interface Order {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orderItems: OrderItem | any;
  shippingAddress1: string;
  shippingAddress2: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  status: number;
  totalPrice: string;
  user: User;
  dateOrdered: string;
}
