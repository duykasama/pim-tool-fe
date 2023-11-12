import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { DefaultLayoutComponent } from './layout/layout.component';
import { HomeComponent } from './modules/home/home.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { ProjectListComponent } from './modules/project-list/project-list.component';
import { SearchBarComponent } from './modules/project-list/search-bar/search-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from './modules/project-list/pagination/pagination.component';
import { CreateProjectComponent } from './modules/create-project/create-project.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { LoaderComponent } from './core/components/loader/loader.component';
import {projectReducer} from "./core/store/project/project.reducer";
import { LoginComponent } from './modules/login/login.component';
import { PageLoaderComponent } from './core/components/page-loader/page-loader.component';
import {OAuthModule} from "angular-oauth2-oidc";
import { LoginFailedModalComponent } from './core/components/modals/login-failed-modal/login-failed-modal.component';
import { CreateProjectSuccessComponent } from './core/components/modals/create-project-success/create-project-success.component';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { ErrorComponent } from './modules/error/error.component';
import { DeleteConfirmationComponent } from './core/components/modals/delete-confirmation/delete-confirmation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {DragScrollModule} from "ngx-drag-scroll";
import { DateFormatPipe } from './core/pipes/date-format.pipe';
import { ProjectStatusResolvePipe } from './core/pipes/project-status-resolve.pipe';
import {searchReducer} from "./core/store/search/search.reducer";
import {sortReducer} from "./core/store/sort/sort.reducers";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {routeReducer} from "./core/store/route/route.reducers";
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {RouteEffects} from "./core/store/route/route.effects";


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DefaultLayoutComponent,
    HomeComponent,
    SideBarComponent,
    ProjectListComponent,
    SearchBarComponent,
    PaginationComponent,
    CreateProjectComponent,
    LoaderComponent,
    LoginComponent,
    PageLoaderComponent,
    LoginFailedModalComponent,
    CreateProjectSuccessComponent,
    NotFoundComponent,
    ErrorComponent,
    DeleteConfirmationComponent,
    DateFormatPipe,
    ProjectStatusResolvePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    StoreModule.forRoot({searchCriteria: searchReducer, sortInfo: sortReducer, route: routeReducer}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CdkDrag,
    CdkDropList,
    DragScrollModule,
    MatDatepickerModule,
    EffectsModule.forRoot([RouteEffects]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [{provide: LOCALE_ID, useValue: 'en-US'}],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http)
}
