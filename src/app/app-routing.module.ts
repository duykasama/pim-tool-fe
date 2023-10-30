import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultLayoutComponent} from "./layout/layout.component";
import {HomeComponent} from "./modules/home/home.component";
import {ProjectListComponent} from "./modules/project-list/project-list.component";
import {CreateProjectComponent} from "./modules/create-project/create-project.component";

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'project-list',
        component: ProjectListComponent
      },
      {
        path: 'create-project',
        component: CreateProjectComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
