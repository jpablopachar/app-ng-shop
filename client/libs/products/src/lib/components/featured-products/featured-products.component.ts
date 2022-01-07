import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html'
})
export class FeaturedProductsComponent implements OnInit {
  public featuredProducts: Product[];

  constructor(private readonly _productsService: ProductsService) {
    this.featuredProducts = [];
  }

  ngOnInit(): void {
    this.getFeaturedProducts();
  }

  private getFeaturedProducts(): void {
    this._productsService
      .getFeaturedProducts(4)
      .subscribe(
        (products: Product[]): Product[] => (this.featuredProducts = products)
      );
  }
}
