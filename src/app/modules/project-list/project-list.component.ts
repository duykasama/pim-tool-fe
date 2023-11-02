import {Component, Input, OnInit, Output} from '@angular/core';
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {formatUtcDate} from "../../core/utils/date.util";
import {resolveProjectStatus} from "../../core/utils/project.util";
import BASE_URL, {ENDPOINTS} from "../../data/apiInfo";
import {Store} from "@ngrx/store";
import {AppState} from "../../core/store/project/project.reducer";
import {Project} from "../../core/models/project/project.models";
import {Observable} from "rxjs";
import {setProjects} from "../../core/store/project/project.action";
import {getAxiosInstance} from "../../core/lib/appAxios";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  faTrash = faTrash

  projects: Project[] = []

  selectedProjects: string[] = []

  isLoading = true

  paginationStatus: PaginationStatus = {
    pageIndex: 1,
    pageSize: 10,
    lastPage: 1,
    isLastPage: false,
  }

  searchCriteria: SearchCriteria = {
    ConjunctionSearchInfos: [],
    DisjunctionSearchInfos: []
  }

  constructor(private store: Store<AppState>) {
  }

  async ngOnInit(): Promise<void> {
    await this.setProjects()
  }

  async setProjects(): Promise<void> {
    const data = await this.getData(this.paginationStatus.pageIndex, this.paginationStatus.pageSize)
    this.projects = data?.data
    this.paginationStatus.pageIndex = data?.pageIndex
    this.paginationStatus.lastPage = data?.lastPage
  }

  selectProject(projectId: string): void {
    if (this.isProjectSelected(projectId)){
      this.selectedProjects.splice(this.selectedProjects.indexOf(projectId),1)
      return
    }

    this.selectedProjects.push(projectId)
  }

  isProjectSelected(projectId: string): boolean {
    return this.selectedProjects.includes(projectId)
  }

  async getData(pageIndex: number, pageSize: number): Promise<any> {
    try {
      this.isLoading = true
      const response = await getAxiosInstance().post(ENDPOINTS.PROJECTS, {
        pageSize,
        pageIndex: Math.max(pageIndex, 1),
        searchCriteria: this.searchCriteria
      })

      // await new Promise(r => setTimeout(r, 2000))
      return response.data?.data
    }catch (e){
      console.log(e)
    }finally {
      this.isLoading = false
    }
  }

  protected readonly formatUtcDate = formatUtcDate;
  protected readonly resolveProjectStatus = resolveProjectStatus;
}

export interface PaginationStatus {
  pageIndex: number,
  pageSize: number,
  lastPage: number,
  isLastPage: boolean
}

export interface SearchInfo {
  fieldName: string,
  value: string,
}

export interface SearchCriteria {
  ConjunctionSearchInfos: SearchInfo[],
  DisjunctionSearchInfos: SearchInfo[]
}
