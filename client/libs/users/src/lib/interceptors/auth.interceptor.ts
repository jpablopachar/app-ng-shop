import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly _localStorageService: LocalstorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token: string | null = this._localStorageService.getToken();
    const isApiUrl: boolean = request.url.startsWith(environment.apiUrl);

    if (token && isApiUrl)
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

    return next.handle(request);
  }
}
