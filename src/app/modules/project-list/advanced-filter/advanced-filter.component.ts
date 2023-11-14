import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {AdvancedFilterState} from "../../../core/store/advanced-filter/advancedFilter.reducers";
import {
  updateEndFrom, updateEndTo,
  updateLeader,
  updateMember,
  updateStartFrom,
  updateStartTo
} from "../../../core/store/advanced-filter/advancedFilter.actions";
import {AdvancedFilter} from "../../../core/models/filter.models";

@Component({
  selector: 'app-advanced-filter',
  templateUrl: './advanced-filter.component.html',
  styleUrls: ['./advanced-filter.component.scss']
})
export class AdvancedFilterComponent {
  advancedFilter: AdvancedFilter = {
    leaderName: '',
    memberName: '',
    startDateRange: {
      from: '',
      to: ''
    },
    endDateRange:  {
      from: '',
      to: ''
    }
  }

  constructor(protected store: Store<{advancedFilter: AdvancedFilterState}>) {
  }

  updateFilter(field: AdvancedFilterFieldName) {
    console.log(this.advancedFilter)
    switch (field) {
      case AdvancedFilterFieldName.LeaderName:
        this.store.dispatch(updateLeader({leaderName: this.advancedFilter.leaderName}))
        break
      case AdvancedFilterFieldName.MemberName:
        this.store.dispatch(updateMember({memberName: this.advancedFilter.memberName}))
        break
      case AdvancedFilterFieldName.StartDateFrom:
        this.store.dispatch(updateStartFrom({startFrom: this.advancedFilter.startDateRange.from}))
        break
      case AdvancedFilterFieldName.StartDateTo:
        this.store.dispatch(updateStartTo({startTo: this.advancedFilter.startDateRange.to}))
        break
      case AdvancedFilterFieldName.EndDateFrom:
        this.store.dispatch(updateEndFrom({endFrom: this.advancedFilter.endDateRange.from}))
        break
      case AdvancedFilterFieldName.EndDateTo:
        this.store.dispatch(updateEndTo({endTo: this.advancedFilter.endDateRange.to}))
        break
    }
  }

  protected readonly AdvancedFilterFieldName = AdvancedFilterFieldName;
}

export enum AdvancedFilterFieldName {
  LeaderName,
  MemberName,
  StartDateFrom,
  StartDateTo,
  EndDateFrom,
  EndDateTo
}
