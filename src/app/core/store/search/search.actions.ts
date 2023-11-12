import {createAction, props} from "@ngrx/store";
import {SearchInfo, SortInfo} from "../../models/filter.models";

export const addConjunctionSearchInfo = createAction(
  'Add conjunction search info',
  props<{searchInfo: SearchInfo}>()
)

export const addDisjunctionSearchInfo = createAction(
  'Add disjunction search info',
  props<{searchInfo: SearchInfo}>()
)

export const clearConjunctionSearchInfo = createAction(
  'Clear conjunction search info'
)

export const clearDisjunctionSearchInfo = createAction(
  'Clear disjunction search info'
)
