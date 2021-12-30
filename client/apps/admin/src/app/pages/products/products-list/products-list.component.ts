import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@client/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {
  public products: Product[];

  constructor(
    private readonly _router: Router,
    private readonly _messageService: MessageService,
    private readonly _confirmationService: ConfirmationService,
    private readonly _productService: ProductsService
  ) {
    this.products = [];
  }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    this._productService
      .getProducts()
      .subscribe(
        (products: Product[]): Product[] => (this.products = products)
      );
  }

  public updateProduct(productId: string): void {
    this._router.navigateByUrl(`products/form/${productId}`);
  }

  public deleteProduct(productId: string): void {
    this._confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete product',
      icon: 'pi pi-exclamation-triangle',
      accept: (): void => {
        this._productService.deleteProduct(productId).subscribe({
          next: (): void => {
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is deleted!',
            });
            this.getProducts();
          },
          error: (): void => {
            this._messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted!',
            });
          },
        });
      },
    });
  }
}
