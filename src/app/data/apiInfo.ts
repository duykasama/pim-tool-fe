const BASE_URL = "http://localhost:20000"

const ENDPOINTS = {
  PROJECTS: "/projects",
  CREATE_PROJECT: "/projects/create",
  UPDATE_PROJECT: "/projects/update",
  SEARCH_PROJECTS: "/projects/search",
  DELETE_PROJECT: "/projects/delete",
  VALIDATE_PROJECT_NUMBER: "/projects/validate",
  LOGIN: "/auth/login",
  VALIDATE_TOKEN: "/auth/validate-token",
  REFRESH_TOKEN: "/auth/refresh",
  GROUPS: "/groups",
  GROUPS_ALL: "/groups/all",
}
export default BASE_URL
export {ENDPOINTS}
