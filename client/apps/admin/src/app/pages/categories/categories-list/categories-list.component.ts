import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@client/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent implements OnInit {
  public categories: Category[];

  constructor(
    private readonly _router: Router,
    private readonly _messageService: MessageService,
    private readonly _confirmationService: ConfirmationService,
    private readonly _categoriesService: CategoriesService
  ) {
    this.categories = [];
  }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this._categoriesService
      .getCategories()
      .subscribe((res: Category[]) => {
        console.log(res);
        this.categories = res;
      });
  }

  public updateCategory(categoryId: string): void {
    console.log(categoryId);
    
    this._router.navigateByUrl(`categories/form/${categoryId}`);
  }

  public deleteCategory(categoryId: string): void {
    this._confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete category',
      icon: 'pi pi-exclamation-triangle',
      accept: (): void => {
        this._categoriesService.deleteCategory(categoryId).subscribe(
          (): void => {
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category is deleted!',
            });
            this.getCategories();
          },
          (): void => {
            this._messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category is not deleted!',
            });
          }
        );
      },
    });
  }
}
