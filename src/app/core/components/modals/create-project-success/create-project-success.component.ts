import {Component, Input} from '@angular/core';
import {faXmark} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-create-project-success',
  templateUrl: './create-project-success.component.html',
  styleUrls: ['./create-project-success.component.scss']
})
export class CreateProjectSuccessComponent {
  @Input() showModal: boolean = false
  @Input() isSuccess: boolean = false
  @Input() message: string = ''

  hideModal() {
    this.showModal = false
  }

  protected readonly faXmark = faXmark;
}
