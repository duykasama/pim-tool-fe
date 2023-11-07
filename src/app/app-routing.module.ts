import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultLayoutComponent} from "./layout/layout.component";
import {HomeComponent} from "./modules/home/home.component";
import {ProjectListComponent} from "./modules/project-list/project-list.component";
import {CreateProjectComponent} from "./modules/create-project/create-project.component";
import {LoginComponent} from "./modules/login/login.component";
import {AuthGuard} from "./core/guards/auth-guard";

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
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
      },
      {
        path: 'update-project/:id',
        component: CreateProjectComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
