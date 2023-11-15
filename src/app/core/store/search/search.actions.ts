import {createAction, props} from "@ngrx/store";
import {SearchInfo} from "../../models/filter.models";

export const addConjunctionSearchInfo = createAction(
  '[Search Action] Add conjunction search info',
  props<{searchInfo: SearchInfo}>()
)

export const addDisjunctionSearchInfo = createAction(
  '[Search Action] Add disjunction search info',
  props<{searchInfo: SearchInfo}>()
)

export const clearConjunctionSearchInfo = createAction(
  '[Search Action] Clear conjunction search infos'
)

export const clearDisjunctionSearchInfo = createAction(
  '[Search Action] Clear disjunction search infos'
)
