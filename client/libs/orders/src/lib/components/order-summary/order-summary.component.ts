import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart, CartItem } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html'
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  public totalPrice: number;
  public isCheckout: boolean;

  private orderSummarySubs: Subscription | undefined;

  constructor(
    private readonly _router: Router,
    private readonly _cartService: CartService,
    private readonly _ordersService: OrdersService
  ) {
    this.totalPrice = 0;
    this._router.url.includes('checkout')
      ? (this.isCheckout = true)
      : (this.isCheckout = false);
  }

  ngOnInit(): void {
    this.getOrderSummary();
  }

  public navigateToCheckout(): void {
    this._router.navigateByUrl('checkout');
  }

  private getOrderSummary(): void {
    this.orderSummarySubs = this._cartService.cart$.subscribe((cart: Cart): void => {
      this.totalPrice = 0;

      if (cart) {
        cart.items.map((item: CartItem): void => {
          this._ordersService
            .getProduct(item.productId)
            .subscribe(
              (product): number =>
                (this.totalPrice += product.price * item.quantity)
            );
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.orderSummarySubs) {
      this.orderSummarySubs.unsubscribe();
    }
  }
}
