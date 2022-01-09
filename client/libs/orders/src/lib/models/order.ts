/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderItem } from "./order-item";

export interface Order {
  id?: string;
  orderItems: OrderItem | any;
  shippingAddress1: string;
  shippingAddress2: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  status: number;
  totalPrice?: string;
  user: any;
  dateOrdered: string;
}
