import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectRoutingModule} from "./project-routing.module";
import {ProjectListComponent} from "./project-list/project-list.component";
import {SearchBarComponent} from "./project-list/search-bar/search-bar.component";
import {PaginationComponent} from "./project-list/pagination/pagination.component";
import {CreateProjectComponent} from "./create-project/create-project.component";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
  ]
})
export class ProjectModule { }
