import {createSelector} from "@ngrx/store";
import {AppState} from "../app.state";

export const selectSearchCriteria = (state: AppState) => state.searchCriteria
export const searchSelectors = createSelector(
  selectSearchCriteria,
  (state: any) => state.initialState
)
