import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@client/products';
import { Subscription } from 'rxjs';
import { Cart, CartItem, CartItemDetailed } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent implements OnInit, OnDestroy {
  public cartItemsDetailed: CartItemDetailed[];
  public cartCount: number;

  private cartPageSubs: Subscription | undefined;

  constructor(
    private readonly _router: Router,
    private readonly _cartService: CartService,
    private readonly _ordersService: OrdersService
  ) {
    this.cartItemsDetailed = [];
    this.cartCount = 0;
  }

  ngOnInit(): void {
    this.getCartDetails();
  }

  public backToShop(): void {
    this._router.navigateByUrl('products');
  }

  public updateCartItemQuantity(event: any, cartItem: CartItemDetailed): void {
    this._cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value,
    }, true);
  }

  public deleteCartItem(cartItem: CartItemDetailed): void {
    this._cartService.deleteCartItem(cartItem.product.id);
  }

  private getCartDetails(): void {
    this.cartPageSubs = this._cartService.cart$.subscribe(
      (cart: Cart): void => {
        this.cartItemsDetailed = [];
        this.cartCount = cart.items.length ?? 0;

        cart.items.forEach((item: CartItem): void => {
          this._ordersService
            .getProduct(item.productId)
            .subscribe((product: Product): number =>
              this.cartItemsDetailed.push({ product, quantity: item.quantity })
            );
        });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.cartPageSubs) {
      this.cartPageSubs.unsubscribe();
    }
  }
}
