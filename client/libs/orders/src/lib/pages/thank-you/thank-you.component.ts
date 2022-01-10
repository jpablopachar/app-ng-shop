import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-thank-you',
  templateUrl: './thank-you.component.html',
})
export class ThankYouComponent implements OnInit {
  constructor(
    private readonly _ordersService: OrdersService,
    private readonly _cartService: CartService
  ) { }

  ngOnInit(): void {
    const order: Order = this._ordersService.getCachedOrderData();
    this._ordersService.createOrder(order).subscribe((): void => {
      this._cartService.emptyCart();
      this._ordersService.removeCachedOrderData();
    });
  }
}
