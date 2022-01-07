import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
})
export class CategoriesBannerComponent implements OnInit {
  public categories: Category[];

  constructor(private readonly _categoriesService: CategoriesService) {
    this.categories = [];
  }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this._categoriesService
      .getCategories()
      .subscribe(
        (categories: Category[]): Category[] => (this.categories = categories)
      );
  }
}
