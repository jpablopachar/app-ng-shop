import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { User } from '../models/user';
import { LocalstorageService } from '../services/localstorage.service';
import { UsersService } from '../services/users.service';
import * as UsersActions from './users.actions';

@Injectable()
export class UsersEffects {
  public buildUserSession$;

  constructor(
    private readonly _actions$: Actions,
    private readonly _localStorageService: LocalstorageService,
    private readonly _usersService: UsersService
  ) {
    this.buildUserSession$ = createEffect(() =>
      this._actions$.pipe(
        ofType(UsersActions.buildUserSession),
        concatMap(() => {
          if (this._localStorageService.isValidToken()) {
            const userId = this._localStorageService.getUserIdFromToken();

            if (userId) {
              return this._usersService.getUser(userId).pipe(
                map((user: User) =>
                  UsersActions.buildUserSessionSuccess({ user })
                ),
                catchError(() => of(UsersActions.buildUserSessionFailed()))
              );
            } else {
              return of(UsersActions.buildUserSessionFailed());
            }
          } else {
            return of(UsersActions.buildUserSessionFailed());
          }
        })
      )
    );
  }
}
