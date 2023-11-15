import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {EndPoints} from "../../data/apiInfo";
import {getAxiosInstance} from "../../core/lib/appAxios";
import {Router} from "@angular/router";
import {GroupService} from "../../core/services/group.service";
import {formatDateTime} from "../../core/utils/date.util";
import {ProjectService} from "../../core/services/project.service";
import {Group, Project} from "../../core/models/project/project.models";
import {routes} from "../../core/constants/routeConstants";

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

  constructor(
    private formBuilder: FormBuilder,
    protected router: Router,
    protected groupService: GroupService,
    protected projectService: ProjectService) {
  }

  ngOnInit() {
    this.groupService.getGroups().subscribe(value => this.groups = value)

    const url = this.router.url
    if (url === routes.CREATE_PROJECT) {
      this.doCreate = true
    } else {
      this.doCreate = false
      const id = url.slice(16, url.length)
      this.projectService.getSingleProject(id).subscribe(project => {
        this.createProjectForm.setValue({
          projectNumber: project.projectNumber,
          name: project?.name,
          customer: project?.customer,
          groupId: project?.groupId || '',
          members: project?.members || '',
          status: project?.status,
          startDate: formatDateTime(project?.startDate),
          endDate: (project && project?.endDate) ? formatDateTime(project?.endDate) : null
        })
        this.projectId = project?.id
        this.projectVersion = project?.version
      })
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
    endDate: ''
  })

  onSubmit() {
    if (!this.createProjectForm.valid || !this.isValidProjectNumber) {
      return
    }

    if (!this.doCreate){
      this.isLoading = true
      this.projectService.updateProject(this.projectId, this.createProjectForm.getRawValue(), this.projectVersion).subscribe(response => {
        this.isSuccess = !!response?.isSuccess
        if (this.isSuccess) {
          this.message = response?.messages[0]?.content || 'Request sent'
          this.resetForm()
        } else {
          this.message = response?.messages[0]?.content || 'Request failed'
        }
        this.isLoading = false
        this.isRequestSent = true
        return
      })
    }

    this.isLoading = true
    this.projectService.createProject(this.createProjectForm.getRawValue()).subscribe(response => {
      this.isSuccess = !!response?.isSuccess
      if (this.isSuccess) {
        this.message = response.data?.messages[0]?.content || 'Request sent'
        this.resetForm()
      } else {
        this.message = response?.messages[0]?.content || 'Request failed'
      }
      this.isLoading = false
      this.isRequestSent = true
    })
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
      .post(`${EndPoints.VALIDATE_PROJECT_NUMBER}/${this.createProjectForm.get('projectNumber')?.getRawValue()}`)
    this.isValidProjectNumber = response.data?.data
  }

  selectMember(member: string) {
    this.selectedMembers.push(member)
    this.members.splice(this.members.indexOf(member), 1)
    this.filteredMembers.splice(this.filteredMembers.indexOf(member), 1)
  }

  deselectMember(member: string) {
    this.members.push(member)
    this.selectedMembers.splice(this.selectedMembers.indexOf(member), 1)
  }

  filterMember() {
    const kw = this.createProjectForm.get('members')?.value
    this.filteredMembers = kw
      ? this.filteredMembers.filter(value=> value.toUpperCase().includes(kw.toUpperCase().trim()))
      : this.filteredMembers = this.members
  }

  protected readonly faXmark = faXmark;
}
