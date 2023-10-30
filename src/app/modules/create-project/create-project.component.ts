import { Component } from '@angular/core';
import {FormBuilder, FormControl, isFormControl, RequiredValidator, Validators} from "@angular/forms";
import axios from "axios";
import {group} from "@angular/animations";
import {isValidDate} from "rxjs/internal/util/isDate";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import BASE_URL, {ENDPOINTS} from "../../data/apiInfo";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent {
  isLoading = false
  isSuccess = false
  isValidProjectNumber = true
  instance = axios.create({
    baseURL: BASE_URL
  })

  constructor(private formBuilder: FormBuilder) {
  }

  createProjectForm = this.formBuilder.group({
    projectNumber:  new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(9999),
    ]),
    name: new FormControl('', [
      Validators.required,
    ]),
    customer:  new FormControl('', [
      Validators.required,
    ]),
    groupId:  new FormControl('', [
      Validators.required,
    ]),
    members: '',
    status:  new FormControl('NEW', [
      Validators.required,
    ]),
    startDate:  new FormControl('', [
      Validators.required,
    ]),
    endDate: ''
  })

  async onSubmit(): Promise<void> {
    if (!this.createProjectForm.valid) {
      return;
    }

    try {
      this.isLoading = true
      const response = await this.instance.post('http://localhost:10002/projects/create', this.createProjectForm.getRawValue())
      await new Promise(r => setTimeout(r, 2000))

      this.isSuccess = response.status === 200 || response.status === 201
    }
    catch (e){
      console.log(e)
      this.isSuccess = false
    }
    finally {
      this.isLoading = false
    }
  }

  showErrorMsg = true

  hideErrorMsg(): void {
    this.showErrorMsg = false
  }

  async validateProjectNumber(): Promise<void> {
    const response = await this.instance
      .post(`${ENDPOINTS.VALIDATE_PROJECT_NUMBER}/${this.createProjectForm.get('projectNumber')?.getRawValue()}`)
    this.isValidProjectNumber = response.data?.data
  }


}
//
// class Project {
//   projectNumber: number
//   name: string
//   customer: string
//   groupId: string
//   members: string
//   status: string
//   startDate: string
//   endDate: string
//   constructor(
//     projectNumber: number,
//     name: string,
//     customer: string,
//     groupId: string,
//     members: string,
//     status: string,
//     startDate: string,
//     endDate: string
//   ) {
//     this.projectNumber = projectNumber
//     this.name = name
//     this.customer = customer
//     this.groupId = groupId
//     this.members = members
//     this.status = status
//     this.startDate = startDate
//     this.endDate = endDate
//   }
// }
