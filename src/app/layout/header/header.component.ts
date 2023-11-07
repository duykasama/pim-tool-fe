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

  temp = true

  switchLanguage() {
    this.temp = !this.temp
    const lang = this.temp ? 'en' : 'vn'
    this.translate.use(lang)
  }
}
