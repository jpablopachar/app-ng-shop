import { Injectable } from '@angular/core';

const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  public setToken(data: string | undefined): void {
    localStorage.setItem(TOKEN, (data as string));
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  public removeToken(): void {
    localStorage.removeItem(TOKEN);
  }
}
