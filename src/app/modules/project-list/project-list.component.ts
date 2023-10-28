import {Component, OnInit} from '@angular/core';
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import axios, {AxiosError} from "axios";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  faTrash = faTrash
  private url: string = 'http://localhost:10002/projects'
  ngOnInit(): void {
    console.log('Start fetching')
    // fetch(this.url)
    //   .then(res => res.json())
    //   .then(jsonRes => console.log(jsonRes))
    //   .catch(e => console.log(e))
    this.getData()
  }

  async getData(): Promise<void> {
    try {
      const axiosInstance = axios.create()
      const response = await axiosInstance.post(this.url, {
        pageSize: 1,
        pageIndex: 1
      })

      console.log(response.data)
    }catch (e){
      console.log(e)
    }
  }
}
