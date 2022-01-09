/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

const TOKEN = 'token';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  public setToken(data: string | undefined): void {
    localStorage.setItem(TOKEN, data as string);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  public removeToken(): void {
    localStorage.removeItem(TOKEN);
  }

  public isValidToken(): boolean {
    const token: string | null = this.getToken();

    if (token) {
      const tokenDecode: any = JSON.parse(atob(token.split('.')[1]));

      return !this.tokenExpired(tokenDecode.exp);
    } else {
      return false;
    }
  }

  public getUserIdFromToken(): any {
    const token: string | null = this.getToken();

    if (token) {
      const tokenDecode: any = JSON.parse(atob(token.split('.')[1]));
      console.log(tokenDecode);

      if (tokenDecode) {
        return tokenDecode.userId;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  private tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
