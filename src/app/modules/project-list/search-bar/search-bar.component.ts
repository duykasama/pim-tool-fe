import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SearchInfo} from "../project-list.component";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() searchInfos!: SearchInfo[]
  @Output() searchProjectEvent = new EventEmitter<void>()
  projectStatus = 'Project Status'
  searchKeyword = ''

  protected search(){
    this.searchInfos.length = 0
    this.searchInfos.push({
      fieldName: 'status',
      value: this.projectStatus != 'Project Status' ? this.projectStatus : ''
    })

    this.searchInfos.push({
      fieldName: 'customer',
      value: this.searchKeyword
    })

    this.searchProjectEvent.emit()
  }

  protected resetSearch(){
    this.searchInfos.length = 0
    this.projectStatus = 'Project Status'
    this.searchKeyword = ''
    this.searchProjectEvent.emit()
  }
}
