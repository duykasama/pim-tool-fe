import axios from "axios";
import BASE_URL from "../../data/apiInfo";
import {getLocalAccessToken} from "../utils/getLocalAccessToken";

export const getAxiosInstance = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Authorization': `Bearer ${getLocalAccessToken()}`
    }
  })
}
