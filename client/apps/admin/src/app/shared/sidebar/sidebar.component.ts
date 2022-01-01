import { Component, OnInit } from '@angular/core';
import { AuthService } from '@client/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor(private readonly _authService: AuthService) { }

  ngOnInit(): void {
  }

  public logoutUser(): void {
    this._authService.logout();
  }
}
