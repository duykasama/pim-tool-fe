import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SearchCriteria, SearchInfo} from "../project-list.component";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() searchCriteria!: SearchCriteria
  @Output() searchProjectEvent = new EventEmitter<void>()
  projectStatus = 'Project Status'
  searchKeyword = ''

  protected search(){
    this.searchCriteria.DisjunctionSearchInfos.length = 0
    this.searchCriteria.ConjunctionSearchInfos.length = 0
    this.searchCriteria.DisjunctionSearchInfos.push({
      fieldName: 'status',
      value: this.projectStatus != 'Project Status' ? this.projectStatus : ''
    })

    this.searchCriteria.ConjunctionSearchInfos.push({
      fieldName: 'projectNumber',
      value: this.searchKeyword
    })
    this.searchCriteria.ConjunctionSearchInfos.push({
      fieldName: 'name',
      value: this.searchKeyword
    })
    this.searchCriteria.ConjunctionSearchInfos.push({
      fieldName: 'customer',
      value: this.searchKeyword
    })

    this.searchProjectEvent.emit()
  }

  protected resetSearch(){
    this.searchCriteria.ConjunctionSearchInfos.length = 0
    this.searchCriteria.DisjunctionSearchInfos.length = 0
    this.projectStatus = 'Project Status'
    this.searchKeyword = ''
    this.searchProjectEvent.emit()
  }
}
