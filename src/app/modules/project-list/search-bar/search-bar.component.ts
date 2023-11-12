import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchCriteria, SortInfo} from "../../../core/models/filter.models";
import {Store} from "@ngrx/store";
import {
  addConjunctionSearchInfo, addDisjunctionSearchInfo,
  clearConjunctionSearchInfo,
  clearDisjunctionSearchInfo
} from "../../../core/store/search/search.actions";
import {resetSortInfo} from "../../../core/store/sort/sort.actions";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() sortInfo!: SortInfo
  @Output() searchProjectEvent = new EventEmitter<void>()
  projectStatus = ''
  currentProjectStatus = ''
  searchKeyword = ''
  currentSearchKeyword = ''

  constructor(private store: Store<{searchCriteria: SearchCriteria, sortInfo: SortInfo}>) {
  }

  ngOnInit() {
    this.store.select('searchCriteria').subscribe(value => {
      const disjunctionSearchInfos = value.DisjunctionSearchInfos.filter(searchInfo => searchInfo.fieldName == 'status')
      if (disjunctionSearchInfos.length > 0) {
        this.currentProjectStatus = disjunctionSearchInfos[0].value
      }
    })
    this.store.select('searchCriteria').subscribe(value => {
      const conjunctionSearchInfos = value.ConjunctionSearchInfos.filter(searchInfo => searchInfo.fieldName === 'name')
      if (conjunctionSearchInfos.length > 0) {
        this.currentSearchKeyword = conjunctionSearchInfos[0].value
      }
    })
  }

  protected search(){
    this.store.dispatch(clearConjunctionSearchInfo())
    this.store.dispatch(clearDisjunctionSearchInfo())

    console.log('current project status is ', this.projectStatus)

    this.store.dispatch(addDisjunctionSearchInfo({
      searchInfo: {
        fieldName: 'status',
        value: this.projectStatus
      }
    }))

    this.store.dispatch(addConjunctionSearchInfo({
      searchInfo: {
        fieldName: 'projectNumber',
        value: this.searchKeyword
      }
    }))

    this.store.dispatch(addConjunctionSearchInfo({
      searchInfo: {
        fieldName: 'name',
        value: this.searchKeyword
      }
    }))

    this.store.dispatch(addConjunctionSearchInfo({
      searchInfo: {
        fieldName: 'customer',
        value: this.searchKeyword
      }
    }))

    this.searchProjectEvent.emit()
  }

  protected resetSearch(){
    this.store.dispatch(clearDisjunctionSearchInfo())
    this.store.dispatch(clearConjunctionSearchInfo())
    this.store.dispatch(resetSortInfo())
    this.projectStatus = ''
    this.currentProjectStatus = ''
    this.searchKeyword = ''
    this.currentSearchKeyword = ''
    this.searchProjectEvent.emit()
  }
}
