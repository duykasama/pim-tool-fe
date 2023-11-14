import {createReducer, on} from "@ngrx/store";
import {SearchCriteria, SearchInfo} from "../../models/filter.models";
import {
  addConjunctionSearchInfo,
  addDisjunctionSearchInfo,
  clearConjunctionSearchInfo,
  clearDisjunctionSearchInfo
} from "./search.actions";

export const initialState: SearchCriteria = {
  ConjunctionSearchInfos: [],
  DisjunctionSearchInfos: []
}

export const searchReducer = createReducer(
  initialState,
  on(addConjunctionSearchInfo, (state, {searchInfo}) => {
    const searchInfos: SearchInfo[] = []
    state.ConjunctionSearchInfos.forEach(value => searchInfos.push(value))
    searchInfos.includes(searchInfo) || searchInfos.push(searchInfo)
    return {...state, ConjunctionSearchInfos: searchInfos}
  }),
  on(addDisjunctionSearchInfo, (state, {searchInfo}) => {
    let searchInfos: SearchInfo[] = []
    state.DisjunctionSearchInfos.forEach(value => searchInfos.push(value))
    searchInfos.includes(searchInfo) || searchInfos.push(searchInfo)
    return {...state, DisjunctionSearchInfos: searchInfos}
  }),
  on(clearConjunctionSearchInfo, (state) => ({...state, ConjunctionSearchInfos: []})),
  on(clearDisjunctionSearchInfo, (state) => ({...state, DisjunctionSearchInfos: []}))
)
