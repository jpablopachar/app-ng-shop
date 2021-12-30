import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import {
  CategoriesService,
  Category,
  Product,
  ProductsService
} from '@client/products';
import { MessageService } from 'primeng/api';
import { lastValueFrom, timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
})
export class ProductsFormComponent implements OnInit {
  public form: FormGroup;
  public editMode: boolean;
  public isSubmitted: boolean;
  public categories: Category[];
  public imageDisplay: string | ArrayBuffer | null;
  public currentProductId: string;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _location: Location,
    private readonly _route: ActivatedRoute,
    private readonly _messageService: MessageService,
    private readonly _categoriesService: CategoriesService,
    private readonly _productsService: ProductsService
  ) {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
    });
    this.editMode = false;
    this.isSubmitted = false;
    this.categories = [];
    this.imageDisplay = '';
    this.currentProductId = '';
  }

  public get productForm(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.checkEditMode();
    this.getCategories();
  }

  public onSubmit(): void {
    this.isSubmitted = true;

    if (this.form.invalid) return;

    const product: FormData = new FormData();

    Object.keys(this.form.controls).map((key: string): void =>
      product.append(key, this.form.controls[key].value)
    );

    if (this.editMode) {
      this.updateProduct(product);
    } else {
      this.addProduct(product);
    }
  }

  public onCancel(): void {
    this._location.back();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onImageUpload(event: any): void {
    const image = event.target.files[0];

    if (image) {
      this.form.patchValue({ image });
      this.form.get('image')?.updateValueAndValidity();

      const fileReader: FileReader = new FileReader();

      fileReader.onload = (): string | ArrayBuffer | null =>
        (this.imageDisplay = fileReader.result);

      fileReader.readAsDataURL(image);
    }
  }

  private checkEditMode(): void {
    this._route.params.subscribe((params: Params): void => {
      if (params['id']) {
        const productId = params['id'];

        this.editMode = true;
        this.currentProductId = productId;

        this._productsService
          .getProduct(productId)
          .subscribe((product: Product): void => {
            const {
              name,
              category,
              brand,
              price,
              countInStock,
              isFeatured,
              description,
              richDescription,
              image,
            } = product;

            this.imageDisplay = image;

            this.form.patchValue({
              name,
              category: category.id,
              brand,
              price,
              countInStock,
              isFeatured,
              description,
              richDescription,
            });
          });
      }
    });
  }

  private getCategories(): void {
    this._categoriesService
      .getCategories()
      .subscribe(
        (categories: Category[]): Category[] => (this.categories = categories)
      );
  }

  private addProduct(product: FormData): void {
    this._productsService.createProduct(product).subscribe({
      next: (product: Product): void => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${product.name} is created!`,
        });
        lastValueFrom(timer(2000)).then((): void => this._location.back());
      },
      error: (): void => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not created!',
        });
      },
    });
  }

  private updateProduct(product: FormData): void {
    this._productsService
      .updateProduct(product, this.currentProductId)
      .subscribe({
        next: (): void => {
          this._messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Product is updated!`,
          });
          lastValueFrom(timer(2000)).then((): void => this._location.back());
        },
        error: (): void => {
          this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Product is not updated!',
          });
        },
      });
  }
}
