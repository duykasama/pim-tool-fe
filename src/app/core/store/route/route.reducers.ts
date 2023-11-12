import {createReducer, on} from "@ngrx/store";
import {switchRoute} from "./route.actions";
import {routes} from "../../constants/routeConstants";

const initialState = routes.PROJECT_LIST

export const routeReducer = createReducer(
  initialState,
  on(switchRoute, (_state, {route}) => {
    return route
  })
)
