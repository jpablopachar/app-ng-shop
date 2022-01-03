import { Component } from '@angular/core';
import { AuthService } from '@client/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(private readonly _authService: AuthService) { }

  public logoutUser(): void {
    this._authService.logout();
  }
}
