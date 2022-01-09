import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';


@Injectable()
export class UsersFacade {
  public currentUser$;
  public isAuthenticated$;

  constructor(private readonly _store: Store) {
    this.currentUser$ = this._store.pipe(select(UsersSelectors.getUser));
    this.isAuthenticated$ = this._store.pipe(select(UsersSelectors.getUserIsAuth));
  }

  public buildUserSession(): void {
    this._store.dispatch(UsersActions.buildUserSession());
  }
}
