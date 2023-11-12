import { Injectable } from '@angular/core';
import {getAxiosInstance} from "../lib/appAxios";
import {ENDPOINTS} from "../../data/apiInfo";
import {SearchCriteria, SortInfo} from "../models/filter.models";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  apiResponse: ApiResponse = {
    isSuccess: false,
    message: ''
  }

  async getProjects(pageIndex: number, pageSize: number, searchCriteria: SearchCriteria, sortInfo: SortInfo): Promise<any> {
    try {
      const response = await getAxiosInstance().post(ENDPOINTS.PROJECTS, {
        pageSize,
        pageIndex: Math.max(pageIndex, 1),
        searchCriteria: searchCriteria,
        sortByInfos: sortInfo.fieldName ? [sortInfo] : []
      })

      return response.data?.data
    }catch (e){
      console.log(e)
      return []
    }
  }

  async getSingleProject(id: string): Promise<any> {
    try {
      const response = await getAxiosInstance().post(`${ENDPOINTS.PROJECTS}/${id}`)
      return response.data?.data
    } catch (e) {
      console.log(e)
      return undefined
    }
  }

  async updateProject(projectId: string, projectInfo: any, projectVersion: number): Promise<any> {
    try {
      const response = await getAxiosInstance().put(`${ENDPOINTS.UPDATE_PROJECT}/${projectId}`,
      {...projectInfo, version: projectVersion}, {
        headers: {
          'UpdaterId': '295189a8-e4df-4b41-fd14-08dbdbacb07b'
        }
      })
      await new Promise(r => setTimeout(r, 200))
      return response.data
    } catch (e: any) {
      await new Promise(r => setTimeout(r, 200))
      console.log(e)
      return e?.response?.message || 'An error occurred'
    }
  }

  async createProject(projectInfo: any): Promise<any> {
    try {
      const response = await getAxiosInstance().post(ENDPOINTS.CREATE_PROJECT, projectInfo)
      await new Promise(r => setTimeout(r, 200))
      return response.data

    } catch (e: any) {
      await new Promise(r => setTimeout(r, 200))
      console.log(e)
      return e?.response?.message || 'An error occurred'
    }
  }

  async deleteProject(id: string) {
    try {
      const response = await getAxiosInstance().delete(`${ENDPOINTS.DELETE_PROJECT}/${id}`)
      this.apiResponse.isSuccess = response.data?.isSuccess
      this.apiResponse.message = response.data?.messages[0]?.content || ''
    } catch (e: any) {
      this.apiResponse.isSuccess = false
      this.apiResponse.message = e?.response.data.message
    }

    return this.apiResponse
  }

  async deleteMultipleProjects(projects: string[]) {
    try {
      const response = await getAxiosInstance().post(ENDPOINTS.DELETE_PROJECT, {
        projectIds: projects
      })
      this.apiResponse.isSuccess = response.data?.isSuccess
      this.apiResponse.message = response.data?.messages[0]?.content || ''
    } catch (e: any) {
      this.apiResponse.isSuccess = false
      this.apiResponse.message = e?.response.data.message
    }

    return this.apiResponse
  }
}

export interface ApiResponse {
  isSuccess: boolean,
  message: string
}
