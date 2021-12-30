import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _urlProducts: string;

  constructor(private readonly _http: HttpClient) {
    this._urlProducts = `${environment.apiUrl}/products`;
  }

  public getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this._urlProducts);
  }

  public getProduct(productId: string): Observable<Product> {
    return this._http.get<Product>(`${this._urlProducts}/${productId}`);
  }

  public createProduct(product: FormData): Observable<Product> {
    return this._http.post<Product>(this._urlProducts, product);
  }

  public updateProduct(
    product: FormData,
    productId: string
  ): Observable<Product> {
    return this._http.put<Product>(
      `${this._urlProducts}/${productId}`,
      product
    );
  }

  public deleteProduct(
    productId: string
  ): Observable<{ success: boolean; message: string }> {
    return this._http.delete<{ success: boolean; message: string }>(
      `${this._urlProducts}/${productId}`
    );
  }
}
