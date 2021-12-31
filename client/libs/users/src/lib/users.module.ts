import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

export const usersRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
})
export class UsersModule {}
