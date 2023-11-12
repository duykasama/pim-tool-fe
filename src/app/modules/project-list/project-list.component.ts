import {Component, OnInit} from '@angular/core';
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Store} from "@ngrx/store";
import {Project, ProjectToDelete} from "../../core/models/project/project.models";
import {ProjectService} from "../../core/services/project.service";
import {PaginationStatus, SearchCriteria, SortInfo} from "../../core/models/filter.models";
import {addSortInfo, revertSortOrder} from "../../core/store/sort/sort.actions";

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

  searchCriteria!: SearchCriteria

  sortInfo!: SortInfo

  projectToDelete: ProjectToDelete = {
    id: '',
    name: ''
  }

  constructor(private store: Store<{searchCriteria: SearchCriteria, sortInfo: SortInfo}>, private projectService: ProjectService) {
    store.select('searchCriteria').subscribe(value => this.searchCriteria = value)
  }

  async ngOnInit(): Promise<void> {
    this.store.select('sortInfo').subscribe(value => this.sortInfo = value)
    console.log('value of sort info: ', this.sortInfo)
    await this.setProjects()
  }

  async setProjects(): Promise<void> {
    this.isLoading = true
    const data = await this.projectService.getProjects(this.paginationStatus.pageIndex, this.paginationStatus.pageSize, this.searchCriteria, this.sortInfo)
    this.projects = data?.data
    this.paginationStatus.pageIndex = data?.pageIndex
    this.paginationStatus.lastPage = data?.lastPage
    this.paginationStatus.isLastPage = data?.isLastPage
    this.isLoading = false
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

  async addSort(fieldName: string) {
    this.sortInfo.fieldName === fieldName
      ? this.store.dispatch(revertSortOrder({fieldName}))
      : this.store.dispatch(addSortInfo({fieldName}))

    await this.setProjects()
  }

  selectProjectToDelete(id: string, name: string) {
    this.projectToDelete = { id, name }
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
}
