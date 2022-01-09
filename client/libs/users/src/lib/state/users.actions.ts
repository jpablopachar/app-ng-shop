import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const buildUserSession = createAction('[Users] Build user session');

export const buildUserSessionSuccess = createAction('', props<{ user: User }>());

export const buildUserSessionFailed = createAction('[Users] Build user session failed');
