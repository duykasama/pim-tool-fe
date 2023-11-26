import {createReducer} from "@ngrx/store";

export interface SettingState {
  darkMode: boolean
  allowImportFile: boolean
  allowExportFile: boolean
  allowMultipleLanguages: boolean
}

const initialState: SettingState = {
  darkMode: false,
  allowImportFile: false,
  allowExportFile: false,
  allowMultipleLanguages: false
}

export const settingReducers = createReducer(
  initialState,

)
