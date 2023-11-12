import {createAction, props} from "@ngrx/store";

export const addSortInfo = createAction(
  'Add sort info',
  props<{fieldName: string}>()
)

export const removeSortInfo = createAction(
  'Remove sort info',
  props<{fieldName: string}>()
)

export const revertSortOrder = createAction(
  'Revert sort order',
  props<{fieldName: string}>()
)

export const resetSortInfo = createAction(
  'Reset sort info'
)
