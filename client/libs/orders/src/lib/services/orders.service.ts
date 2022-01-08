import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private _urlOrders: string;
  private _urlProducts: string;

  constructor(private readonly _http: HttpClient) {
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
}
