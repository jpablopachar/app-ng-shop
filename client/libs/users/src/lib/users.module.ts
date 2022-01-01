import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth.service';
import { LocalstorageService } from './services/localstorage.service';

export const usersRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes),
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  declarations: [LoginComponent],
  providers: [AuthService, LocalstorageService]
})
export class UsersModule {}
