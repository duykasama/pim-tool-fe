import {AuthConfig} from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
  issuer: "http://localhost:20000",
  redirectUri: window.location.origin + '/index.html',
  clientId: 'PIMTool',
  scope: 'openid profile email voucher'
}
