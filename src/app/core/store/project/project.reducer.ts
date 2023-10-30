import {Action, createReducer, on} from "@ngrx/store";
import {ProjectActionTypes, setProjects} from "./project.action";
import {Project} from "../../models/project/project.models";

export interface AppState {
  projects: Project[]
}

const initialState: AppState = {
  projects: []
}

export const  projectReducer = createReducer(
  initialState,
  on(setProjects, (state, payload) => {
    return {
      ...state,
      projects: payload.projects
    }
  })
)
