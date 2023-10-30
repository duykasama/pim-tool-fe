import { NgModule } from '@angular/core';
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
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    StoreModule.forRoot({projects: projectReducer}),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
