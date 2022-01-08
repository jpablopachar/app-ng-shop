import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: [],
})
export class CartIconComponent implements OnInit, OnDestroy {
  public cartCount: string;

  private _cartIconSubs: Subscription | undefined;

  constructor(private readonly _cartService: CartService) {
    this.cartCount = '0';
  }

  ngOnInit(): void {
    this._cartIconSubs = this._cartService.cart$.subscribe(
      (cart: Cart): string => (this.cartCount = String(cart.items.length ?? 0))
    );
  }

  ngOnDestroy(): void {
    if (this._cartIconSubs) {
      this._cartIconSubs.unsubscribe();
    }
  }
}
