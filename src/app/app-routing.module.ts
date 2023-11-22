import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultLayoutComponent} from "./layout/layout.component";
import {ProjectListComponent} from "./modules/project-list/project-list.component";
import {CreateProjectComponent} from "./modules/create-project/create-project.component";
import {LoginComponent} from "./modules/login/login.component";
import {AuthGuard} from "./core/guards/auth-guard";
import {NotFoundComponent} from "./modules/not-found/not-found.component";
import {ErrorComponent} from "./modules/error/error.component";

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'project-list'
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
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
