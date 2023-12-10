import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import { fadeAnimation } from 'src/app/core/animations/fade.animation';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
  animations: [...fadeAnimation]
})
export class DeleteConfirmationComponent {
  @Input() projectName!: string
  @Input() isSingle!: boolean
  @Output() cancelEvent= new EventEmitter<void>()
  @Output() deleteEvent = new EventEmitter<void>()
  @Input() showModal!: boolean
  @Output() showModalChange: EventEmitter<boolean> = new EventEmitter()

  hideModal() {
    this.showModal = false
    this.showModalChange.emit()
  }

  cancel() {
    this.cancelEvent.emit()
  }

  delete() {
    this.deleteEvent.emit()
  }

  protected readonly faXmark = faXmark;
}
