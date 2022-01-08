import { Component, Input } from '@angular/core';
import { CartItem, CartService } from '@client/orders';
import { Product } from '../../models/product';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html'
})
export class ProductItemComponent {
  @Input() product: Product | undefined;

  constructor(private readonly _cartService: CartService) { }

  addProductToCart(): void {
    const cartItem: CartItem = {
      productId: (this.product?.id as string),
      quantity: 1
    }

    this._cartService.setCartItem(cartItem);
  }
}
