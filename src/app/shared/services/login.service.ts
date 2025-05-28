import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { User } from '../../Interfaces/User';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private notifyService: NotificationService, private commonService: CommonService) { }

  doLogin(payLoad: any) {
    return this.http.post<User>(this.commonService.apiServerURL + 'api/auth/signin', payLoad, { observe: 'response' })
      .pipe(
        catchError(err => {
          if (err.status == 500) {
            this.notifyService.showError(err.statusText, "An error occurred");
          } else if (err.status == 404) {
            this.notifyService.showError("Incorrect User ID or Password", "Invalid Credentials");
          }
          throw new Error(err.name);
        })
      );
  }
  getProfile(emailId: any) {
    return this.http.get<string>(this.commonService.apiServerURL + `api/v1/userprofile?email=${emailId}`, { observe: 'response' })
      .pipe(
        catchError(err => {
          if (err.status == 500) {
            this.notifyService.showError(err.statusText, "An error occurred");
          } else if (err.status == 404) {
            this.notifyService.showError("Server Error", "An error occurred");
          }
          throw new Error(err.name);
        })
      );
  }
}
