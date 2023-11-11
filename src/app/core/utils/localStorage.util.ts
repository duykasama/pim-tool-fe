export const getLocalAccessToken = () => {
  return localStorage.getItem('access_token')
}

export const getLocalRefreshToken = () => {
  return localStorage.getItem('refresh_token')
}
