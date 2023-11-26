import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AdvancedFilterState} from "../../../../core/store/advanced-filter/advancedFilter.reducers";
import {
  updateEndFrom, updateEndTo,
  updateLeader,
  updateMember,
  updateStartFrom,
  updateStartTo
} from "../../../../core/store/advanced-filter/advancedFilter.actions";
import {AdvancedFilter} from "../../../../core/models/filter.models";
import {selectFilterProperties} from "../../../../core/store/advanced-filter/advancedFilter.selectors";

@Component({
  selector: 'app-advanced-filter',
  templateUrl: './advanced-filter.component.html',
  styleUrls: ['./advanced-filter.component.scss']
})
export class AdvancedFilterComponent implements OnInit {
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

  constructor(protected store: Store<{advancedFilter: AdvancedFilterState}>) {}

  ngOnInit() {
    this.store.select(selectFilterProperties).subscribe(value =>
      this.advancedFilter = {
      ...value,
      startDateRange: {...value.startDateRange},
      endDateRange: {...value.endDateRange}
    })
  }

  updateFilter(field: AdvancedFilterFieldName) {
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
