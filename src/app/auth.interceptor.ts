import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './shared/services/token-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { StaticApiService } from './shared/static-api.service';
const TOKEN_HEADER_KEY = 'Authorization';
const X_CORDS = 'X-location';
const TENANT_ID = 'X-tenantId';
const LANG_ID = 'X-langCode';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  cordinates: string = "";

  constructor(private token: TokenStorageService, private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let partnerCode = this.token.getPartnerId();
    let langCode = this.token.getLangId();
    window.navigator.geolocation.getCurrentPosition(position => {
      this.cordinates = `latitude=${position.coords.latitude},longitude=${position.coords.longitude}, ip_add=${this.token.getIp()}`;
    });
    if (!this.cordinates) {
      this.cordinates = `ip_add=${this.token.getIp()}`;
    }
    let authReq = req;
    const token = this.token.getToken();
    if (partnerCode == null) {
      partnerCode = StaticApiService.fetchDefaultPartnerId();
    }
    if (langCode == null) {
      langCode = StaticApiService.fetchDefaultLangId();
    }
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token).set(X_CORDS, this.cordinates).set(TENANT_ID, partnerCode).set(LANG_ID, langCode) });
    } else {
      authReq = req.clone({ headers: req.headers.set(X_CORDS, this.cordinates).set(TENANT_ID, partnerCode).set(LANG_ID, langCode) });
    }
    if ((req.url.includes('fion/api/v1/biometrics') && req.body.operation === 'search') || (req.url.includes('fion/api/v1/securitymeasure'))) {
      this.spinner.hide();
    }

    else if (req.url.includes('s3/upload-url')) {
      this.spinner.show();
      return next.handle(authReq).pipe(
        finalize(() => {
        })
      );
    }

    else {
      this.spinner.show();
    }
    return next.handle(authReq).pipe(
      finalize(() => {
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
      })
    );
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
