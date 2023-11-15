import axios from "axios";
import BASE_URL, {EndPoints} from "../../data/apiInfo";
import {getLocalRefreshToken, getLocalAccessToken} from "../utils/localStorage.util";

export const getAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Authorization': `Bearer ${getLocalAccessToken()}`
    }
  })

  axiosInstance.interceptors.response.use(
    res => {
      return res
    },
    async err => {
      const prevRequest = err.config
      if (err.response.status === 401 && !prevRequest.sent) {
        prevRequest.sent = true
        const newToken = await refreshToken()
        prevRequest.headers['Authorization'] = `Bearer ${newToken}`
        return axiosInstance(prevRequest)
      }
      return Promise.reject(err)
    }
  )
  return axiosInstance
}

const refreshToken = async () => {
  try {
    const response = await axios.create({baseURL: BASE_URL}).post(`${EndPoints.REFRESH_TOKEN}/${getLocalRefreshToken()}`)
    const token = response.data?.data
    localStorage.setItem('access_token', token)
    return token
  } catch (e) {
    return ''
  }
}
