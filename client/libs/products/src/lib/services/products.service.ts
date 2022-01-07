import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _urlProducts: string;

  constructor(private readonly _http: HttpClient) {
    this._urlProducts = `${environment.apiUrl}/products`;
  }

  public getProducts(categoriesFilter?: string[]): Observable<Product[]> {
    let params: HttpParams = new HttpParams();

    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(', '));
    }

    return this._http.get<Product[]>(this._urlProducts, { params });
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

  public getProductsCount(): Observable<number> {
    return this._http
      .get<{ productsCount: number }>(`${this._urlProducts}/get/count`)
      .pipe(map((res: { productsCount: number }) => res.productsCount));
  }

  public getFeaturedProducts(count: number): Observable<Product[]> {
    return this._http.get<Product[]>(
      `${this._urlProducts}/get/featured/${count}`
    );
  }
}
