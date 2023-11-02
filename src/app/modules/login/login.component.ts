import { Component } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {getAxiosInstance} from "../../core/lib/appAxios";
import {ENDPOINTS} from "../../data/apiInfo";
import {Router} from "@angular/router";
import {AxiosError} from "axios";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

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

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.validateEmail()
      this.validatePassword()
      return
    }

    try {
      this.isLoading = true
      const response = await getAxiosInstance().post(ENDPOINTS.LOGIN, {
        ...this.loginForm.getRawValue()
      })

      await new Promise(r => setTimeout(r, 1000))
      if (response.data?.isSuccess) {
        localStorage.setItem('access_token', response.data?.data?.accessToken)
        localStorage.setItem('refresh_token', response.data?.data?.refreshToken)
        await this.router.navigate([''])
      } else {
        this.isLoginSuccess = false
      }
    } catch (e: any | AxiosError) {
      this.errorMsg = e.response.data?.messages[0]?.content
      this.isLoginSuccess = false
      console.log(e)
    } finally {
      this.isLoading = false
    }
  }
}
