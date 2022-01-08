export interface Cart {
  items: CartItem[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartItemDetailed {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
  quantity: number;
}
