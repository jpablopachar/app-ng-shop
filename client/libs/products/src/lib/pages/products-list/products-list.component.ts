import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
  public products: Product[];
  public categories: Category[];
  public isCategoryPage: boolean;
  public binary: boolean;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _categoriesService: CategoriesService,
    private readonly _productsService: ProductsService
  ) {
    this.products = [];
    this.categories = [];
    this.isCategoryPage = true;
    this.binary = true;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params): void => {
      params['categoryId']
        ? this.getProducts([params['categoryId']])
        : this.getProducts();
      params['categoryId']
        ? (this.isCategoryPage = true)
        : (this.isCategoryPage = false);
    });
    this.getCategories();
  }

  private getProducts(categoriesFilter?: string[]): void {
    this._productsService
      .getProducts(categoriesFilter)
      .subscribe(
        (products: Product[]): Product[] => (this.products = products)
      );
  }

  private getCategories(): void {
    this._categoriesService
      .getCategories()
      .subscribe(
        (categories: Category[]): Category[] => (this.categories = categories)
      );
  }

  public categoryFilter(): void {
    const selectedCategories: string[] = this.categories
      .filter((category: Category): boolean | undefined => category.checked)
      .map((category: Category): string => category.id);

    this.getProducts(selectedCategories);
  }
}
