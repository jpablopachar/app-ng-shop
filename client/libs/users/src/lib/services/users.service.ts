import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { getName, getNames, registerLocale } from 'i18n-iso-countries';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const require: any;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _urlUsers: string;

  constructor(private readonly _http: HttpClient) {
    this._urlUsers = `${environment.apiUrl}/users`;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  public getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this._urlUsers);
  }

  public getUser(userId: string): Observable<User> {
    return this._http.get<User>(`${this._urlUsers}/${userId}`);
  }

  public createUser(user: User): Observable<User> {
    return this._http.post<User>(this._urlUsers, user);
  }

  public updateUser(user: User): Observable<User> {
    return this._http.put<User>(`${this._urlUsers}/${user.id}`, user);
  }

  public deleteUser(
    userId: string
  ): Observable<{ success: boolean; message: string }> {
    return this._http.delete<{ success: boolean; message: string }>(
      `${this._urlUsers}/${userId}`
    );
  }

  public getUsersCount(): Observable<number> {
    return this._http
      .get<{ usersCount: number }>(`${this._urlUsers}/get/count`)
      .pipe(map((res: { usersCount: number }): number => res.usersCount));
  }

  public getCountries(): {
    id: string;
    name: string;
  }[] {
    return Object.entries(getNames('en', { select: 'official' })).map(
      (entry: [string, string]): { id: string; name: string } => ({
        id: entry[0],
        name: entry[1],
      })
    );
  }

  public getCountry(countryKey: string): string {
    return getName(countryKey, 'en');
  }
}
