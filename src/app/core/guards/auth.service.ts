import { Injectable } from '@angular/core';
import {getAxiosInstance} from "../lib/appAxios";
import {ENDPOINTS} from "../../data/apiInfo";
import {OAuthService} from "angular-oauth2-oidc";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  isLoggedIn(): boolean {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      return false
    }

    return Date.now() <= this.getExpirationTime(accessToken);
  }

  // Get expiration time in milliseconds
  getExpirationTime(token: string) {
    const decodedToken = jwtDecode(token)
    return (decodedToken.exp || 0) * 1000
  }
}