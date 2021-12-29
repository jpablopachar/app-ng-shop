import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrdersModule } from '@client/orders';

@NgModule({
  imports: [CommonModule, OrdersModule],
})
export class ProductsModule {}
