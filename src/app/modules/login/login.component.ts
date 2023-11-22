import { Component } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import BASE_URL, {EndPoints} from "../../data/apiInfo";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "../../core/services/project.service";
import {routes} from "../../core/constants/routeConstants";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  isValidEmail = true
  isValidPassword = true
  isLoading = false
  isLoginSuccess = true
  errorMsg = ''

  loginForm = this.formBuilder.group({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      // Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$%^&*()-_+=]).{8,}$')
    ])
  })

  validateEmail() {
    this.isValidEmail = !this.loginForm.get('email')?.invalid && !this.loginForm.pristine
  }

  validatePassword() {
    this.isValidPassword = !this.loginForm.get('password')?.invalid && !this.loginForm.pristine
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.validateEmail()
      this.validatePassword()
      return
    }

    this.isLoading = true
    this.http.post<ApiResponse>(
      `${BASE_URL}/${EndPoints.LOGIN}`,
      this.loginForm.getRawValue()
    ).subscribe({
      next: (response) =>  {
        if (response.isSuccess) {
          localStorage.setItem('access_token', response.data?.accessToken)
          localStorage.setItem('refresh_token', response.data?.refreshToken)
          this.router.navigate([routes.PROJECT_LIST])
          const expireTime = jwtDecode(response.data?.accessToken).exp
          expireTime && setTimeout(() => {
            console.log('request for refresh token')
          }, expireTime - Date.now())
        } else {
          this.isLoginSuccess = false
          this.isLoading = false
        }
      }
    })
  }
}
