import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { User, UsersService } from '@client/users';
import { MessageService } from 'primeng/api';
import { lastValueFrom, timer } from 'rxjs';

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
})
export class UsersFormComponent implements OnInit {
  public form: FormGroup;
  public isSubmitted: boolean;
  public editMode: boolean;
  public curentUserId: string;
  public countries: { id: string; name: string }[];

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _route: ActivatedRoute,
    private readonly _location: Location,
    private readonly _messageService: MessageService,
    private readonly _usersService: UsersService
  ) {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
    });
    this.isSubmitted = false;
    this.editMode = false;
    this.curentUserId = '';
    this.countries = [];
  }

  public get userForm(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.getCountries();
    this.checkEditMode();
  }

  public onSubmit(): void {
    this.isSubmitted = true;

    if (this.form.invalid) return;

    const {
      name,
      email,
      password,
      phone,
      isAdmin,
      street,
      apartment,
      zip,
      city,
      country,
    } = this.form.value;

    const user: User = {
      id: this.curentUserId,
      name,
      email,
      password,
      phone,
      isAdmin,
      street,
      apartment,
      zip,
      city,
      country,
    };

    if (this.editMode) {
      this.updateUser(user);
    } else {
      this.addUser(user);
    }
  }

  public onCancel(): void {
    this._location.back();
  }

  private checkEditMode(): void {
    this._route.params.subscribe((params: Params): void => {
      if (params['id']) {
        const userId = params['id'];

        this.editMode = true;
        this.curentUserId = userId;

        this._usersService.getUser(userId).subscribe((user: User): void => {
          const {
            name,
            email,
            phone,
            isAdmin,
            street,
            apartment,
            zip,
            city,
            country,
          } = user;

          this.form.patchValue({
            name,
            email,
            phone,
            isAdmin,
            street,
            apartment,
            zip,
            city,
            country,
          });
          this.userForm['password'].setValidators([]);
          this.userForm['password'].updateValueAndValidity();
        });
      }
    });
  }

  private getCountries(): void {
    this.countries = this._usersService.getCountries();
  }

  private addUser(user: User): void {
    this._usersService.createUser(user).subscribe({
      next: (user: User): void => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User ${user.name} is created!`,
        });
        lastValueFrom(timer(2000)).then((): void => this._location.back());
      },
      error: (): void => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created!',
        });
      },
    });
  }

  private updateUser(user: User): void {
    this._usersService.updateUser(user).subscribe({
      next: (): void => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User is updated!`,
        });
        lastValueFrom(timer(2000)).then((): void => this._location.back());
      },
      error: (): void => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated!',
        });
      },
    });
  }
}
