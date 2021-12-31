import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@client/users';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  public users: User[];

  constructor(
    private readonly _router: Router,
    private readonly _messageService: MessageService,
    private readonly _confirmationService: ConfirmationService,
    private readonly _usersService: UsersService
  ) {
    this.users = [];
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this._usersService
      .getUsers()
      .subscribe((users: User[]): User[] => (this.users = users));
  }

  public updateUser(userId: string): void {
    this._router.navigateByUrl(`users/form/${userId}`);
  }

  public deleteUser(userId: string): void {
    this._confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete user',
      icon: 'pi pi-exclamation-triangle',
      accept: (): void => {
        this._usersService.deleteUser(userId).subscribe({
          next: (): void => {
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User is deleted!',
            });
            this.getUsers();
          },
          error: (): void => {
            this._messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User is not deleted!',
            });
          },
        });
      },
    });
  }
}
