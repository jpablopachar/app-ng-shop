import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../models/user';
import { UsersState, USERS_FEATURE_KEY } from './users.reducer';

export const getUsersState =
  createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const getUser = createSelector(
  getUsersState,
  (state: UsersState): User | null => state.user
);

export const getUserIsAuth = createSelector(
  getUsersState,
  (state: UsersState): boolean => state.isAuthenticated
);
