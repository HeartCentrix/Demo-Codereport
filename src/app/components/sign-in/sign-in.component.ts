import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { pluck } from 'rxjs';
import { LoginService } from '../../shared/services/login.service';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sign-in',
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {

  form!: FormGroup;

  constructor(public fb: FormBuilder, private router: Router, private loginService: LoginService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      "email": ["", Validators.compose([Validators.required, Validators.email])],
      "password": ["", Validators.compose([Validators.required])]
    })
  }

  onSubmit() {
    this.requestLogin();
  }

  requestLogin() {
    this.loginService.doLogin({ 'username': this.form.value.email, 'password': this.form.value.password })
      .pipe(
        pluck('body')
      )
      .subscribe((resp: any) => {
        this.tokenService.saveToken(resp.token);
        this.loginService.getProfile(resp.email).pipe(pluck('body'))
          .subscribe((profileResp: any) => {
            const user1 = profileResp.data.userProfile;
            user1.roles = resp.roles;
            user1.email = user1.personal.email;
            this.tokenService.saveUser(user1);
            if (user1.roles[0] === 'ROLE_ADMIN') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigateByUrl('/updateProfProfile');
            }

          },
            (error: any) => {
              // this.notifyService.showError(error, 'Error');
              // this.router.navigateByUrl('/instructions');
            })
        // this.tokenService.saveUser(resp);
        //this.router.navigateByUrl('/instructions');
      },
        (error: any) => {
          // this.notifyService.showError(error, 'Error');
          // this.router.navigateByUrl('/instructions');
        });
  }
}
