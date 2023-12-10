import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectRoutingModule} from "./project-routing.module";
import { FileImportComponent } from './components/file-import/file-import.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { SearchBarComponent } from './project-list/search-bar/search-bar.component';
import { PaginationComponent } from './project-list/pagination/pagination.component';
import { AdvancedFilterComponent } from './project-list/advanced-filter/advanced-filter.component';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";
import { DragScrollModule } from "ngx-drag-scroll";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectStatusResolvePipe } from '../../core/pipes/project-status-resolve.pipe';
import { DateFormatPipe } from '../../core/pipes/date-format.pipe';
import { EmployeeFormatPipe } from '../../core/pipes/employee-format.pipe';
import { PageLoaderComponent } from '../../core/components/page-loader/page-loader.component';
import { FileExportComponent } from './components/file-export/file-export.component';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { DateInputComponent } from 'src/app/core/components/date-input/date-input.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from 'src/app/core/components/loader/loader.component';
import { DeleteConfirmationComponent } from 'src/app/core/components/modals/delete-confirmation/delete-confirmation.component';

@NgModule({
  declarations: [
    ProjectListComponent,
    CreateProjectComponent,
    SearchBarComponent,
    PaginationComponent,
    AdvancedFilterComponent,
    DateFormatPipe,
    EmployeeFormatPipe,
    PageLoaderComponent,
    FileImportComponent,
    FileExportComponent,
    DateInputComponent,
    ProjectStatusResolvePipe,
    LoaderComponent,
    DeleteConfirmationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    MatTooltipModule,
    DragScrollModule,
    FontAwesomeModule,
    FormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ]
})
export class ProjectModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http)
}
