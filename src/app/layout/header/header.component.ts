import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router, private translate: TranslateService) {
  }
  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    this.router.navigate(['login'])
  }

  displayLanguageOptions = false

  switchLanguage(langCode: string) {
    this.translate.use(langCode)
    localStorage.setItem('lang', langCode)
    this.displayLanguageOptions = false
  }
}
