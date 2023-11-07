import { Injectable } from '@angular/core';
import {getAxiosInstance} from "../lib/appAxios";
import {ENDPOINTS} from "../../data/apiInfo";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor() { }

  async getGroups() {
    try {
      const response = await getAxiosInstance().get(ENDPOINTS.GROUPS_ALL)
      if (response.data?.isSuccess){
        return response.data?.data
      }
      return []
    } catch (e) {
      console.log(e)
    }
  }
}
