import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private _urlProducts: string;

  constructor(private readonly http: HttpClient) {
    this._urlProducts = `${environment.apiUrl}/orders`;
  }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this._urlProducts);
  }

  public getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this._urlProducts}/${orderId}`);
  }

  public createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this._urlProducts, order);
  }

  public updateOrder(
    orderStatus: { status: string },
    orderId: string
  ): Observable<Order> {
    return this.http.put<Order>(`${this._urlProducts}/${orderId}`, orderStatus);
  }

  public deleteOrder(
    orderId: string
  ): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this._urlProducts}/${orderId}`
    );
  }
}
