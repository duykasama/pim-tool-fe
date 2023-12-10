import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PIM Tool';
  constructor(public translate: TranslateService, private store: Store) {
  }
  
  ngOnInit(): void {
    this.translate.addLangs(['en', 'vn', 'fr', 'jp'])
    const lang = localStorage.getItem('lang') || 'jp'   
    localStorage.setItem('lang', lang)
    this.translate.setDefaultLang(lang)
  }
}
