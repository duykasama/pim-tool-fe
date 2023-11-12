import {createAction, props} from "@ngrx/store";

export const addSortInfo = createAction(
  '[Sort Action] Add sort info',
  props<{fieldName: string}>()
)

export const removeSortInfo = createAction(
  '[Sort Action] Remove sort info',
  props<{fieldName: string}>()
)

export const revertSortOrder = createAction(
  '[Sort Action] Revert sort order',
  props<{fieldName: string}>()
)

export const resetSortInfo = createAction(
  '[Sort Action] Reset sort info'
)
