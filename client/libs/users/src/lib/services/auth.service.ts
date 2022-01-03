import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _urlAuth: string;

  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router,
    private readonly _token: LocalstorageService
  ) {
    this._urlAuth = `${environment.apiUrl}/users`;
  }

  public login(email: string, password: string): Observable<User> {
    return this._http.post<User>(`${this._urlAuth}/login`, { email, password });
  }

  public logout(): void {
    this._token.removeToken();
    this._router.navigateByUrl('/login');
  }
}
