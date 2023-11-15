import { Injectable } from '@angular/core';
import BASE_URL, {EndPoints} from "../../data/apiInfo";
import {SearchCriteria, SortInfo} from "../models/filter.models";
import {Store} from "@ngrx/store";
import {AdvancedFilterState} from "../store/advanced-filter/advancedFilter.reducers";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {getLocalAccessToken} from "../utils/localStorage.util";
import {Project} from "../models/project/project.models";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  isAdvancedSearch = false

  constructor(private store: Store<{advancedFilter: AdvancedFilterState}>, private http: HttpClient) {
    store.select('advancedFilter').subscribe(value => this.isAdvancedSearch = value.showFilter)
  }

  apiResponse: ApiResponse = {
    isSuccess: false,
    messages: [],
    data: null
  }

  config = {
    headers: {
      'Authorization': `Bearer ${getLocalAccessToken()}`
    }
  }

  loadProjects(pageIndex: number, pageSize: number, searchCriteria: SearchCriteria, sortInfo: SortInfo): Observable<ApiResponse> {
    let payLoad = {
      pageSize,
      pageIndex: Math.max(pageIndex, 1),
      searchCriteria: searchCriteria,
      sortByInfos: sortInfo.fieldName ? [sortInfo] : []
    }
    let advancedFilterPayload;
    this.isAdvancedSearch && this.store.select('advancedFilter')
      .subscribe(value => advancedFilterPayload = {...payLoad, advancedFilter: value.filterState})
    const finalPayload = this.isAdvancedSearch ? advancedFilterPayload : payLoad;
    return this.http.post<ApiResponse>(
      `${BASE_URL}/${EndPoints.PROJECTS}`,
      finalPayload,
      this.config
    )
  }

  getSingleProject(id: string): Observable<Project> {
    return this.http.post<ApiResponse>(
      `${BASE_URL}/${EndPoints.PROJECTS}/${id}`,
      null,
      this.config
    ).pipe(
      map(value => value.data)
    )
  }

  updateProject(projectId: string, projectInfo: any, projectVersion: number): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${BASE_URL}/${EndPoints.UPDATE_PROJECT}/${projectId}`,
      {...projectInfo, version: projectVersion},
      {
        ...this.config,
        headers: {
          ...this.config.headers,
          'UpdaterId': '295189a8-e4df-4b41-fd14-08dbdbacb07b'
        }
      },
    )
  }

  createProject(projectInfo: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${BASE_URL}/${EndPoints.CREATE_PROJECT}`,
      projectInfo,
      this.config
    )
  }

  deleteProject(id: string) {
    this.http.delete(
      `${BASE_URL}/${EndPoints.DELETE_PROJECT}/${id}`,
      this.config
    ).subscribe()
  }

  deleteMultipleProjects(projects: string[]) {
    this.http.post<ApiResponse>(
      `${BASE_URL}/${EndPoints.DELETE_PROJECT}`,
      {
        projectIds: projects
      },
      this.config
    ).subscribe()
  }
}

export interface ApiResponse {
  isSuccess: boolean
  messages: ApiMessage[]
  data: any
}

export interface ApiMessage {
  content: string
  type: number
}
