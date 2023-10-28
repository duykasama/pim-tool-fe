import {Component, OnInit} from '@angular/core';
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {formatUtcDate} from "../../core/utils/date.util";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  faTrash = faTrash
  private url: string = 'http://localhost:10002/projects'
  projects: Project[] = []
  isLoading = true
  async ngOnInit(): Promise<void> {
    await this.getData()
    console.log(this.projects)
  }

  async getData(): Promise<void> {
    try {

      const axiosInstance = axios.create()
      const response = await axiosInstance.post(this.url, {
        pageSize: 10,
        pageIndex: 1
      })

      await new Promise(r => setTimeout(r, 1000))
      this.projects = response.data?.data?.data
      this.isLoading = false
    }catch (e){
      console.log(e)
    }
  }

  protected readonly formatUtcDate = formatUtcDate;
}

interface Project {
  id: string
  projectNumber: number
  name: string
  status: string
  customer: string
  startDate: string
}
