import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { OrdersModule } from '@client/orders';
import { UiModule } from '@client/ui';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent,
  },
  {
    path: 'category/:categoryId',
    component: ProductsListComponent,
  },
  {
    path: 'products/:productId',
    component: ProductPageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ButtonModule,
    CheckboxModule,
    RatingModule,
    InputNumberModule,
    OrdersModule,
    UiModule,
  ],
  declarations: [
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsSearchComponent,
    ProductPageComponent,
    ProductsListComponent,
  ],
  exports: [
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsSearchComponent,
    ProductPageComponent,
    ProductsListComponent,
  ],
  providers: [],
})
export class ProductsModule {}
