const BASE_URL = "http://localhost:20000"

const ENDPOINTS = {
  PROJECTS: "/api/v0/projects",
  CREATE_PROJECT: "/api/v0/projects/create",
  SEARCH_PROJECTS: "/api/v0/projects/search",
  VALIDATE_PROJECT_NUMBER: "/api/v0/projects/validate",
  LOGIN: "api/v0/auth/login",
  VALIDATE_TOKEN: "api/v0/auth/validate-token",
  REFRESH_TOKEN: "api/v0/auth/refresh"
}
export default BASE_URL
export {ENDPOINTS}
