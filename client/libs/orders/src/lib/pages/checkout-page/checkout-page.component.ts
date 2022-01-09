import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { User, UsersService } from '@client/users';
import { Subscription } from 'rxjs';
import { Cart, CartItem } from '../../models/cart';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  public isSubmitted: boolean;
  public orderItems: OrderItem[];
  public userId: string;
  public countries: {
    id: string;
    name: string;
  }[];
  public form: FormGroup;

  private checkoutPageSubs: Subscription | undefined;

  constructor(
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _usersService: UsersService,
    private readonly _cartService: CartService,
    private readonly _ordersService: OrdersService
  ) {
    this.isSubmitted = false;
    this.orderItems = [];
    this.userId = '';
    this.countries = [];
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  public get checkoutForm(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    console.log('se inicia componente')
    this.autoFillUserData();
    this.getCartItems();
    this.getCountries();
  }

  public placeOrder(): void {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    const { phone, city, country, zip, apartment, street } = this.form.value;

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: street,
      shippingAddress2: apartment,
      city,
      zip,
      country,
      phone,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    };

    this._ordersService.createOrder(order).subscribe(() => {
      this._cartService.emptyCart();
      this._router.navigateByUrl('success');
    });
  }

  public backToCart(): void {
    this._router.navigateByUrl('cart');
  }

  private autoFillUserData(): void {
    console.log('entra en funcion');
    
    this.checkoutPageSubs = this._usersService.observeCurrentUser().subscribe((user: User | null): void => {
      if (user) {
        console.log(user);
        
        const { id, name, email, phone, city, street, country, zip, apartment } = user;

        this.userId = id;

        this.form.patchValue({ name, email, phone, city, street, country, zip, apartment })
        // this.form.controls['name'].setValue(name);
      }
    })
  }

  private getCartItems(): void {
    const cart: Cart = this._cartService.getCart();

    this.orderItems = cart.items.map(
      (item: CartItem): { product: string; quantity: number } => ({
        product: item.productId,
        quantity: item.quantity,
      })
    );
  }

  private getCountries(): void {
    this.countries = this._usersService.getCountries();
  }

  ngOnDestroy(): void {
    if (this.checkoutPageSubs) {
      this.checkoutPageSubs.unsubscribe();
    }
  }
}
