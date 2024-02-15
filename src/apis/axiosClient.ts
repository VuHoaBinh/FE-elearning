import axios from 'axios'
import { IAccesstoken } from 'src/types/token'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
  headers: {
    'content-type': 'application/json',
  },
  //   paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config: any) => {
  const { accessToken }: IAccesstoken = JSON.parse(
    localStorage.getItem('access_token') || JSON.stringify({ accessToken: '' })
  )

  return {
    ...config,
    params: config.params || {},
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },

  async (error) => {
    // Handle errors

    if (error.response) {
      //Call request token, access token expires
      if (error.request.status === 401) {
        try {
          const { accessToken }: IAccesstoken = JSON.parse(
            localStorage.getItem('access_token') || JSON.stringify({ accessToken: '' })
          )
          const url = window.location.origin + '/unauthorized'
          if (accessToken) {
            window.location.href = url
          }
        } catch (error: any) {
          if (error.response && error.response.data) {
            return Promise.reject(error.response.data)
          }
          return Promise.reject(error)
        }
      }
    }
    return Promise.reject(
      error.response.data.message || error.response || 'Phản hồi từ sever trả về không chính xác'
    )
  }
)
export default axiosClient
