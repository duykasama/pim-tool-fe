import { Component } from '@angular/core';
import {FormBuilder, FormControl, isFormControl, RequiredValidator, Validators} from "@angular/forms";
import axios, {AxiosError} from "axios";
import {group} from "@angular/animations";
import {isValidDate} from "rxjs/internal/util/isDate";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import BASE_URL, {ENDPOINTS} from "../../data/apiInfo";
import {getAxiosInstance} from "../../core/lib/appAxios";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent {
  isLoading = false
  isSuccess = false
  isValidProjectNumber = true
  isRequestSent = false
  message = ''

  constructor(private formBuilder: FormBuilder, protected router: Router) {
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
    endDate: null
  })

  async onSubmit(): Promise<void> {
    if (!this.createProjectForm.valid || !this.isValidProjectNumber) {
      return;
    }

    try {
      this.isLoading = true
      const response = await getAxiosInstance().post(ENDPOINTS.CREATE_PROJECT, this.createProjectForm.getRawValue())
      await new Promise(r => setTimeout(r, 1000))

      this.isSuccess = !!response.data?.isSuccess
      this.message = response.data?.messages[0]?.content || 'Request sent'
      this.resetForm()
    }
    catch (e: any | AxiosError){
      this.message = e.response.data?.messages[0]?.content || 'Request sent'
      this.isSuccess = false
    }
    finally {
      this.isLoading = false
      this.isRequestSent = true
    }
  }

  private resetForm() {
    this.createProjectForm.reset()
    const initState = {
      projectNumber: 0,
      name: '',
      customer: '',
      groupId: '',
      members: '',
      status: 'NEW',
      startDate: '',
      endDate: null
    }
    this.createProjectForm.setValue(initState)
  }

  showErrorMsg = true

  hideErrorMsg(): void {
    this.showErrorMsg = false
  }

  async validateProjectNumber(): Promise<void> {
    const response = await getAxiosInstance()
      .post(`${ENDPOINTS.VALIDATE_PROJECT_NUMBER}/${this.createProjectForm.get('projectNumber')?.getRawValue()}`)
    this.isValidProjectNumber = response.data?.data
  }


    protected readonly document = document;
}
