import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private _urlCategories: string;

  constructor(private readonly http: HttpClient) {
    this._urlCategories = `${environment.apiUrl}/categories`;
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this._urlCategories);
  }

  public getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this._urlCategories}/${categoryId}`);
  }

  public createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this._urlCategories, category);
  }

  public updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(
      `${this._urlCategories}/${category.id}`,
      category
    );
  }

  public deleteCategory(
    categoryId: string
  ): Observable<{ success: boolean; message: string }> {
    return this.http.get<{ success: boolean; message: string }>(
      `${this._urlCategories}/${categoryId}`
    );
  }
}
