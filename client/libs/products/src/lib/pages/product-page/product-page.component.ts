import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit {
  public product: Product | undefined;
  public quantity: number;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _productsService: ProductsService
  ) {
    this.quantity = 0;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params): void => {
      const productId = params['productId'];

      if (productId) {
        this.getProduct(productId);
      }
    });
  }

  public addProductToCart(): void {
    console.log('load');
  }

  private getProduct(id: string): void {
    this._productsService
      .getProduct(id)
      .subscribe((product: Product): Product => (this.product = product));
  }
}
