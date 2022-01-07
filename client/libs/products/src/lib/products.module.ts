import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersModule } from '@client/orders';
import { ButtonModule } from 'primeng/button';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsSearchComponent } from './components/products-search/products-search.component';

@NgModule({
  imports: [CommonModule, RouterModule, ButtonModule, OrdersModule],
  declarations: [
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsSearchComponent,
  ],
  exports: [
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsSearchComponent,
  ],
})
export class ProductsModule {}
