import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  public form: FormGroup;
  public isSubmitted: boolean;
  public authError: boolean;
  public authMessage: string;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _localStorageService: LocalstorageService,
    private readonly _authService: AuthService
  ) {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.isSubmitted = false;
    this.authError = false;
    this.authMessage = 'Email or password are wrong';
  }

  public get loginForm(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public onSubmit(): void {
    this.isSubmitted = true;

    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this._authService.login(email, password).subscribe({
      next: (user) => {
        this.authError = false;

        this._localStorageService.setToken(user.token);
        this._router.navigateByUrl('');
      },
      error: (error: HttpErrorResponse): void => {
        this.authError = true;

        if (error.status !== 400)
          this.authMessage = 'Error in the server, please try again later!';
      },
    });
  }
}
