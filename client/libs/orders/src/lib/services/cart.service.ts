import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart$: BehaviorSubject<Cart>;

  constructor() {
    this.cart$ = new BehaviorSubject(this.getCart());
  }

  public initCart(): void {
    const cart: Cart = this.getCart();

    if (!cart) {
      const initialCart: string = JSON.stringify({ items: [] });

      localStorage.setItem(CART_KEY, initialCart);
    }
  }

  public getCart(): Cart {
    const cart: Cart = JSON.parse(localStorage.getItem(CART_KEY) as string);

    return cart;
  }

  public emptyCart(): void {
    const initialCart: string = JSON.stringify({ items: [] });

    localStorage.setItem(CART_KEY, initialCart);
    this.cart$.next({ items: [] });
  }

  public setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart: Cart = this.getCart();
    const cartItemExist: CartItem | undefined = cart.items.find(
      (item: CartItem): boolean => item.productId === cartItem.productId
    );

    if (cartItemExist) {
      cart.items.map((item: CartItem): CartItem | void => {
        if (item.productId === cartItem.productId) {
          if (updateCartItem) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity = item.quantity + cartItem.quantity;
          }

          return item;
        }
      });
    } else {
      cart.items.push(cartItem);
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);

    return cart;
  }

  public deleteCartItem(productId: string): void {
    const cart: Cart = this.getCart();
    const newCart: CartItem[] = cart.items.filter(
      (item: CartItem): boolean => item.productId !== productId
    );

    cart.items = newCart;

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);
  }
}
