import { Component, OnInit } from '@angular/core';
import { UsersService } from '@client/users';

@Component({
  selector: 'client-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly _usersService: UsersService) { }

  ngOnInit(): void {
    this._usersService.initAppSession();
  }
}
