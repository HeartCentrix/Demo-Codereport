import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { User } from '../../Interfaces/User';
import { CommonService } from '../common.service';
import { NotificationService } from './notification.service';
import { HttpClient } from '@angular/common/http';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const IP_ADD = 'ip-add';
const AUTH_CODE_STATUS = 'auth-code-status';
const PARTNER_ID = "p_id";
const LANG_ID = "lang_id";


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public setAuthCodeStatus(resp: string) {
    window.sessionStorage.setItem(AUTH_CODE_STATUS, resp);
  }
  public getAuthCodeStatus(): string | null {
    return window.sessionStorage.getItem(AUTH_CODE_STATUS);
  }

  constructor(private http: HttpClient, private notifyService: NotificationService, private commonService: CommonService) { }
  signOut(): void {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public savePartnerId(partnerCode: string) {
    window.sessionStorage.removeItem(PARTNER_ID);
    window.sessionStorage.setItem(PARTNER_ID, partnerCode);
  }
  public getPartnerId(): string | null {
    return window.sessionStorage.getItem(PARTNER_ID);
  }

  public saveLangId(langCode: string) {
    window.sessionStorage.removeItem(LANG_ID);
    window.sessionStorage.setItem(LANG_ID, langCode);
  }
  public getLangId(): string | null {
    return window.sessionStorage.getItem(LANG_ID);
  }

  public saveIp(ip: string): void {
    window.sessionStorage.removeItem(IP_ADD);
    window.sessionStorage.setItem(IP_ADD, ip);
  }
  public getIp(): string | null {
    return window.sessionStorage.getItem(IP_ADD);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  doLogout() {
    return this.http.post<User>(this.commonService.apiServerURL + 'api/auth/signout', {}, { observe: 'response' })
      .pipe(
        catchError(err => {
          if (err.status == 500) {
            this.notifyService.showError(err.statusText, "An error occurred");
          }
          throw new Error(err.name);
        })
      );
  }
}

