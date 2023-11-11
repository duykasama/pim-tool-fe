import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AxiosError} from "axios";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {ENDPOINTS} from "../../data/apiInfo";
import {getAxiosInstance} from "../../core/lib/appAxios";
import {Router} from "@angular/router";
import {GroupService} from "../../core/services/group.service";
import {formatDateTime} from "../../core/utils/date.util";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  isLoading = false
  isSuccess = false
  isValidProjectNumber = true
  isRequestSent = false
  doCreate = true
  focus = false
  mouseIn = false
  message = ''
  groups: Group[] = []
  projectId = ''
  projectVersion = 0
  members: string[] = [
    'ATN: Nguyen Ba Anh Thu',
    'MKN: Nguyen Minh Kha',
    'MQD: Dang Vu Minh Quang',
    'PNH: Nguyen Hong Phong',
    'DNT: Duy Nguyen Thanh',
    'TDN: Thanh Duy Nguyen'
  ]
  filteredMembers: string[] = this.members
  selectedMembers: string[] = []

  constructor(private formBuilder: FormBuilder, protected router: Router, protected groupService: GroupService) {
  }

  async ngOnInit() {
    this.groups = await this.groupService.getGroups()
    const url = this.router.url
    if (url.includes('create-project')) {
      this.doCreate = true
    } else {
      this.doCreate = false
      const id = url.slice(16, url.length)
      const response = await getAxiosInstance().post(`${ENDPOINTS.PROJECTS}/${id}`)
      this.createProjectForm.setValue({
        projectNumber: response.data?.data.projectNumber,
        name: response.data?.data?.name,
        customer: response.data?.data?.customer,
        groupId: response.data?.data?.groupId || '',
        members: response.data?.data?.members || '',
        status: response.data?.data?.status,
        startDate: formatDateTime(response.data?.data?.startDate),
        endDate: response.data?.data?.endDate || null
      })
      this.projectId = response.data?.data?.id
      this.projectVersion = response.data?.data?.version
      this.createProjectForm.controls['projectNumber'].disable()
    }
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

    if (!this.doCreate){
      try {
        this.isLoading = true
        const response = await getAxiosInstance().put(`${ENDPOINTS.UPDATE_PROJECT}/${this.projectId}`,
          {...this.createProjectForm.getRawValue(), version: this.projectVersion}, {
            headers: {
              'UpdaterId': '295189a8-e4df-4b41-fd14-08dbdbacb07b'
            }
          })
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
      return
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

  selectMember(member: string) {
    this.selectedMembers.push(member)
    const index = this.members.indexOf(member)
    this.members.splice(index, 1)
  }

  deselectMember(member: string) {
    this.members.push(member)
    this.selectedMembers.splice(this.selectedMembers.indexOf(member), 1)
  }

  filterMember() {
    const kw = this.createProjectForm.get('members')?.value
    if (kw) {
      this.filteredMembers = this.filteredMembers.filter((value, index, array) => array[index].toUpperCase().includes(kw.toUpperCase().trim()))
    } else {
      this.filteredMembers = this.members
    }
  }

  protected readonly faXmark = faXmark;
}

interface Group {
  id: string,
  name: string,
  leaderId: string
}
