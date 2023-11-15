import { Injectable } from '@angular/core';
import {getAxiosInstance} from "../lib/appAxios";
import BASE_URL, {EndPoints} from "../../data/apiInfo";
import {HttpClient} from "@angular/common/http";
import {getLocalAccessToken} from "../utils/localStorage.util";
import {ApiResponse} from "./project.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getGroups(): Observable<any> {
    return this.http.get<ApiResponse>(
      `${BASE_URL}/${EndPoints.GROUPS_ALL}`,
      {
        headers: {
          'Authorization': 'Bearer ' + getLocalAccessToken()
        }
      }
    ).pipe(
      map(value => value.data)
    )
    // try {
    //   const response = await getAxiosInstance().get(EndPoints.GROUPS_ALL)
    //   if (response.data?.isSuccess){
    //     return response.data?.data
    //   }
    //   return []
    // } catch (e) {
    //   console.log(e)
    //   return []
    // }
  }
}
