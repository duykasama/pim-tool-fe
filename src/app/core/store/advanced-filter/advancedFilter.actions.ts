import {createAction, props} from "@ngrx/store";

export const showAdvancedFilter = createAction(
  '[Advanced Filter Action] Show advanced filter'
)

export const resetAdvancedFilter = createAction(
  '[Advanced Filter Action] Reset advanced filter'
)

export const updateLeader = createAction(
  '[Advanced Filter Action] Update leader',
  props<{leaderName: string}>()
)

export const updateMember = createAction(
  '[Advanced Filter Action] Update member',
  props<{memberName: string}>()
)

export const updateStartFrom = createAction(
  '[Advanced Filter Action] Update start date from',
  props<{startFrom: string}>()
)

export const updateStartTo = createAction(
  '[Advanced Filter Action] Update start date to',
  props<{startTo: string}>()
)

export const updateEndFrom = createAction(
  '[Advanced Filter Action] Update end date from',
  props<{endFrom: string}>()
)
export const updateEndTo = createAction(
  '[Advanced Filter Action] Update end date to',
  props<{endTo: string}>()
)


