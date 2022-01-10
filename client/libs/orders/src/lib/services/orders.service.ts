import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { StripeError } from '@stripe/stripe-js';
import { StripeService } from 'ngx-stripe';
import { map, Observable, switchMap } from 'rxjs';
import { Order } from '../models/order';
import { OrderItem } from '../models/order-item';

const ORDERDATA = 'orderData';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private _urlOrders: string;
  private _urlProducts: string;

  constructor(
    private readonly _http: HttpClient,
    private readonly _stripeService: StripeService
  ) {
    this._urlOrders = `${environment.apiUrl}/orders`;
    this._urlProducts = `${environment.apiUrl}/products`;
  }

  public getOrders(): Observable<Order[]> {
    return this._http.get<Order[]>(this._urlOrders);
  }

  public getOrder(orderId: string): Observable<Order> {
    return this._http.get<Order>(`${this._urlOrders}/${orderId}`);
  }

  public createOrder(order: Order): Observable<Order> {
    return this._http.post<Order>(this._urlOrders, order);
  }

  public updateOrder(
    orderStatus: { status: string },
    orderId: string
  ): Observable<Order> {
    return this._http.put<Order>(`${this._urlOrders}/${orderId}`, orderStatus);
  }

  public deleteOrder(
    orderId: string
  ): Observable<{ success: boolean; message: string }> {
    return this._http.delete<{ success: boolean; message: string }>(
      `${this._urlOrders}/${orderId}`
    );
  }

  public getOrdersCount() {
    return this._http
      .get<number>(`${this._urlOrders}/get/count`)
      .pipe(map((res: any) => res.orderCount));
  }

  public getTotalSales() {
    return this._http
      .get<number>(`${this._urlOrders}/get/totalSales`)
      .pipe(map((res: any) => res.totalSales));
  }

  public getProduct(productId: string): Observable<any> {
    return this._http.get<any>(`${this._urlProducts}/${productId}`);
  }

  public createCheckoutSession(orderItem: OrderItem[]): Observable<{
    error: StripeError;
  }> {
    return this._http
      .post<{ id: string }>(
        `${this._urlOrders}/create-checkout-session`,
        orderItem
      )
      .pipe(
        switchMap((session: { id: string }) =>
          this._stripeService.redirectToCheckout({ sessionId: session.id })
        )
      );
  }

  public cacheOrderData(order: Order): void {
    localStorage.setItem(ORDERDATA, JSON.stringify(order))
  }

  public getCachedOrderData(): Order {
    return JSON.parse((localStorage.getItem(ORDERDATA) as string))
  }

  public removeCachedOrderData(): void {
    localStorage.removeItem(ORDERDATA)
  }
}
