import {createReducer, on} from "@ngrx/store";
import {SortInfo} from "../../models/filter.models";
import {addSortInfo, removeSortInfo, resetSortInfo, revertSortOrder} from "./sort.actions";
import {state} from "@angular/animations";

const initialState: SortInfo = {
    fieldName: 'projectNumber',
    ascending: true
  }

export const sortReducer = createReducer(
  initialState,
  on(addSortInfo, (state, {fieldName}) => ({...state, fieldName})),
  on(removeSortInfo, (state, {fieldName}) => ({...state, fieldName: ''})),
  on(revertSortOrder, (state, {fieldName}) => ({...state, ascending: !state.ascending})),
  on(resetSortInfo, _ => initialState)
)
