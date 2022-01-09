import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { User } from '../models/user';
import * as UsersActions from './users.actions';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const initialUsersState: UsersState = {
  user: null,
  isAuthenticated: false,
};

const usersReducer: ActionReducer<UsersState, Action> = createReducer(
  initialUsersState,
  on(
    UsersActions.buildUserSession,
    (state: UsersState): { user: User | null; isAuthenticated: boolean } => ({
      ...state,
    })
  ),
  on(UsersActions.buildUserSessionSuccess, (state: UsersState, action) => ({
    ...state,
    user: action.user,
    isAuthenticated: true,
  })),
  on(
    UsersActions.buildUserSessionFailed,
    (state: UsersState): { user: null; isAuthenticated: boolean } => ({
      ...state,
      user: null,
      isAuthenticated: false,
    })
  )
);

export function reducer(
  state: UsersState | undefined,
  action: Action
): UsersState {
  return usersReducer(state, action);
}
