import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { DefaultLayoutComponent } from './layout/layout.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { LoginComponent } from './modules/login/login.component';
import { PageLoaderComponent } from './core/components/page-loader/page-loader.component';
import { LoginFailedModalComponent } from './core/components/modals/login-failed-modal/login-failed-modal.component';
import { CreateProjectSuccessComponent } from './core/components/modals/create-project-success/create-project-success.component';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { ErrorComponent } from './modules/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {DragScrollModule} from "ngx-drag-scroll";
import {searchReducer} from "./core/store/search/search.reducer";
import {sortReducer} from "./core/store/sort/sort.reducers";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {routeReducer} from "./core/store/route/route.reducers";
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {RouteEffects} from "./core/store/route/route.effects";
import {advancedFilterReducer} from "./core/store/advanced-filter/advancedFilter.reducers";
import {NgOptimizedImage} from "@angular/common";
import {HttpClientInterceptor} from "./core/lib/httpClientInterceptor";
import {ToastrModule} from "ngx-toastr";
import {MatTooltipModule} from "@angular/material/tooltip";
import {settingReducer} from "./core/store/setting/setting.reducers";
import { pageReducer } from './core/store/page/page.reducer';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DefaultLayoutComponent,
    SideBarComponent,
    LoginComponent,
    PageLoaderComponent,
    LoginFailedModalComponent,
    CreateProjectSuccessComponent,
    NotFoundComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CdkDrag,
    CdkDropList,
    DragScrollModule,
    MatDatepickerModule,
    NgOptimizedImage,
    MatTooltipModule,
    StoreModule.forRoot({
      searchCriteria: searchReducer,
      sortInfo: sortReducer,
      route: routeReducer,
      advancedFilter: advancedFilterReducer,
      settings: settingReducer,
      page: pageReducer
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      newestOnTop: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      tapToDismiss: false,
    }),
    EffectsModule.forRoot([RouteEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http)
}
