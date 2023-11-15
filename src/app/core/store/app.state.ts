import {SearchCriteria} from "../models/filter.models";
import {RouteState} from "./route/route.reducers";
import {SortState} from "./sort/sort.reducers";

export interface AppState {
  searchCriteria: SearchCriteria
  route: RouteState
  sort: SortState
}
