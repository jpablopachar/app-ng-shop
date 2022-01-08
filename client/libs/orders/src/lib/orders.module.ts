import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { UsersService } from '@client/users';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CartService } from '..';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

export const ordersRoutes: Route[] = [
  { path: 'cart', component: CartPageComponent },
  { path: 'checkout', component: CheckoutPageComponent },
  { path: 'success', component: ThankYouComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ordersRoutes),
    BadgeModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
  ],
  declarations: [
    CartPageComponent,
    ThankYouComponent,
    CartIconComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
  ],
  exports: [CartIconComponent, CartPageComponent, OrderSummaryComponent],
  providers: [UsersService]
})
export class OrdersModule {
  constructor(private readonly _cartService: CartService) {
    this._cartService.initCart();
  }
}
