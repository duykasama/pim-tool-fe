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
import {ProjectService} from "../../core/services/project.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = []
  selectedProjects: string[] = []
  isLoading = true
  showDeleteModal = false
  singleDeletion = true
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

  sortInfo: SortInfo = {
    fieldName: 'projectNumber',
    ascending: true
  }

  projectToDelete: ProjectToDelete = {
    id: '',
    name: ''
  }

  constructor(private store: Store<AppState>, private projectService: ProjectService) {
  }

  async ngOnInit(): Promise<void> {
    await this.setProjects()
  }

  async setProjects(): Promise<void> {
    const data = await this.getData(this.paginationStatus.pageIndex, this.paginationStatus.pageSize)
    this.projects = data?.data
    this.paginationStatus.pageIndex = data?.pageIndex
    this.paginationStatus.lastPage = data?.lastPage
    this.paginationStatus.isLastPage = data?.isLastPage
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
        searchCriteria: this.searchCriteria,
        sortByInfos: this.sortInfo.fieldName ? [this.sortInfo] : []
      })

      // await new Promise(r => setTimeout(r, 2000))
      return response.data?.data
    }catch (e){
      console.log(e)
    }finally {
      this.isLoading = false
    }
  }

  async addSort(fieldName: string) {
    if (this.sortInfo.fieldName === fieldName) {
      this.sortInfo.ascending = !this.sortInfo.ascending
    } else {
      this.sortInfo.fieldName = fieldName
      this.sortInfo.ascending = true
    }
    await this.setProjects()
  }



  selectProjectToDelete(id: string, name: string) {
    this.projectToDelete.id = id
    this.projectToDelete.name = name
    this.singleDeletion = true
    this.showDeleteModal = true
  }

  async deleteSingleProject() {
    this.showDeleteModal = false
    await this.projectService.deleteProject(this.projectToDelete.id)
    await this.setProjects()
  }

  async deleteMultipleProjects() {
    this.showDeleteModal = false
    await this.projectService.deleteMultipleProjects(this.selectedProjects)
    this.selectedProjects.length = 0
    await this.setProjects()
  }

  cancelDelete() {
    this.showDeleteModal = false
  }

  faTrash = faTrash
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

export interface SortInfo {
  fieldName: string,
  ascending: boolean
}

export interface SearchCriteria {
  ConjunctionSearchInfos: SearchInfo[],
  DisjunctionSearchInfos: SearchInfo[]
}

export interface ProjectToDelete {
  id: string,
  name: string
}
