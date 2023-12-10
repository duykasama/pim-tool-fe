import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import {SettingsRoutingModule} from "./settings-routing.module";
import { SettingItemComponent } from './components/setting-item/setting-item.component';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";



@NgModule({
  declarations: [
    GeneralSettingsComponent,
    SettingItemComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ]
})
export class SettingsModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http)
}