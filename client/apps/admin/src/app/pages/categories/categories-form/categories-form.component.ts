import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoriesService, Category } from '@client/products';
import { MessageService } from 'primeng/api';
import { lastValueFrom, timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
})
export class CategoriesFormComponent implements OnInit {
  public form: FormGroup;
  public isSubmitted: boolean;
  public editMode: boolean;
  public currentCategoryId: string;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _route: ActivatedRoute,
    private readonly _location: Location,
    private readonly _messageService: MessageService,
    private readonly _categoriesService: CategoriesService
  ) {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff'],
    });
    this.isSubmitted = false;
    this.editMode = false;
    this.currentCategoryId = '';
  }

  public get categoryForm(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.checkEditMode();
  }

  public onSubmit(): void {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    const { name, icon, color } = this.form.value;

    const category: Category = {
      id: this.currentCategoryId,
      name,
      icon,
      color,
    };

    if (this.editMode) {
      this.updateCategory(category);
    } else {
      this.addCategory(category);
    }
  }

  public onCancel(): void {
    this._location.back();
  }

  private checkEditMode(): void {
    this._route.params.subscribe((params: Params): void => {
      if (params['id']) {
        const categoryId = params['id'];

        this.editMode = true;
        this.currentCategoryId = categoryId;

        this._categoriesService
          .getCategory(categoryId)
          .subscribe((category: Category): void => {
            console.log(category);
            
            const { name, icon, color } = category;

            this.form.setValue({ name, icon, color });
          });
      }
    });
  }

  private addCategory(category: Category): void {
    this._categoriesService.createCategory(category).subscribe({
      next: (category: Category): void => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category ${category.name} is created!`,
        });

        lastValueFrom(timer(2000)).then((): void => this._location.back());
      },
      error: (): void => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not created!',
        });
      },
    });
  }

  private updateCategory(category: Category): void {
    this._categoriesService.updateCategory(category).subscribe({
      next: (): void => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category is updated!`,
        });

        lastValueFrom(timer(2000)).then((): void => this._location.back());
      },
      error: (): void => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not updated!',
        });
      },
    });
  }
}
