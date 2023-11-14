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
  showAdvancedFilter: boolean = false
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

  constructor(private store: Store<{searchCriteria: SearchCriteria, sortInfo: SortInfo, advancedFilter: boolean}>, private projectService: ProjectService) {
    store.select('searchCriteria').subscribe(value => this.searchCriteria = value)
    store.select('sortInfo').subscribe(value => this.sortInfo = value)
    store.select('advancedFilter').subscribe(value => this.showAdvancedFilter = value)
  }

  async ngOnInit(): Promise<void> {
    await this.setProjects()
  }

  async setProjects(): Promise<void> {
    this.isLoading = true
    const data = await this.projectService.getProjects(this.paginationStatus.pageIndex, this.paginationStatus.pageSize, this.searchCriteria, this.sortInfo)
    this.projects = data?.data
    this.paginationStatus = {
      ...this.paginationStatus,
      pageIndex: data?.pageIndex,
      lastPage: data?.lastPage,
      isLastPage: data?.isLastPage
    }
    this.isLoading = false
  }

  selectProject(projectId: string): void {
    this.isProjectSelected(projectId)
      ? this.selectedProjects.splice(this.selectedProjects.indexOf(projectId),1)
      : this.selectedProjects.push(projectId)
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
    this.selectedProjects = []
    await this.setProjects()
  }

  cancelDelete() {
    this.showDeleteModal = false
  }

  faTrash = faTrash
}
