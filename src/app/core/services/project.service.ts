import { Injectable } from '@angular/core';
import {getAxiosInstance} from "../lib/appAxios";
import {ENDPOINTS} from "../../data/apiInfo";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  apiResponse: ApiResponse = {
    isSuccess: false,
    message: ''
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
