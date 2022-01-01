import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _localStorageService: LocalstorageService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token: string | null = this._localStorageService.getToken();

    if (token) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tokenDecode: any = JSON.parse(atob(token.split('.')[1]));

      if (tokenDecode.isAdmin && !this.tokenExpired(tokenDecode.exp))
        return true;
    }

    this._router.navigateByUrl('login');

    return false;
  }

  private tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
