import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import axios from "axios";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent {


  constructor(private formBuilder: FormBuilder) {
  }

  createProjectForm = this.formBuilder.group({
    projectNumber: 0,
    name: '',
    customer: '',
    groupId: '',
    members: '',
    status: '',
    startDate: '',
    endDate: ''
  })

  async onSubmit(): Promise<void> {
    const instance = axios.create()
    try {
      await instance.post('http://localhost:10002/projects/create', this.createProjectForm.getRawValue())
    }
    catch (e){
      console.log(e)
    }
  }
}
