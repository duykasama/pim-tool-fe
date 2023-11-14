import {createReducer, on} from "@ngrx/store";
import {showAdvancedFilter} from "./advancedFilter.actions";

const initialState = true

export const advancedFilterReducer = createReducer(
  initialState,
  on(showAdvancedFilter, (state) => !state)
)
