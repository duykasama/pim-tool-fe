import {Component, OnInit} from '@angular/core';
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {formatUtcDate} from "../../core/utils/date.util";
import {resolveProjectStatus} from "../../core/utils/project.util";
import BASE_URL, {ENDPOINTS} from "../../data/apiInfo";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  faTrash = faTrash
  projects: Project[] = []
  isLoading = true
  selectedForDelete = false
  async ngOnInit(): Promise<void> {
    await this.getData()
  }

  async getData(): Promise<void> {
    try {
      const axiosInstance = axios.create({
        baseURL: BASE_URL
      })
      const response = await axiosInstance.post(ENDPOINTS.PROJECTS, {
        pageSize: 10,
        pageIndex: 1
      })

      // await new Promise(r => setTimeout(r, 1000))
      this.projects = response.data?.data?.data
      this.isLoading = false
    }catch (e){
      console.log(e)
    }
  }

  protected readonly formatUtcDate = formatUtcDate;
  protected readonly resolveProjectStatus = resolveProjectStatus;
}

interface Project {
  id: string
  projectNumber: number
  name: string
  status: string
  customer: string
  startDate: string
}
