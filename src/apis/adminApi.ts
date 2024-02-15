import { ICreateNewUser, IGetUser } from 'src/types/user'
import axiosClient from './axiosClient'

const ADMIN_API = '/admin'

const adminApi = {
  getUsers: (params?: IGetUser) => {
    const url = ADMIN_API + '/users'
    return axiosClient.get(url, { params })
  },
  getStudents: (params?: IGetUser) => {
    const url = ADMIN_API + '/users/students'
    return axiosClient.get(url, { params })
  },
  getUserDetail: (id: string | number) => {
    const url = ADMIN_API + '/users/' + id
    return axiosClient.get(url)
  },
  createNewUser: (userInfo: ICreateNewUser) => {
    const url = ADMIN_API + '/users'
    return axiosClient.post(url, userInfo)
  },
  uploadUserByExcel: (file: any) => {
    const url = ADMIN_API + '/users/multiple'
    return axiosClient.post(url, file)
  },
  updateUserInfo: (id: string | number, userInfo: any) => {
    const url = ADMIN_API + '/users/' + id
    return axiosClient.put(url, userInfo)
  },
  deleteUser: (id: string | number) => {
    const url = ADMIN_API + '/users/' + id
    return axiosClient.delete(url)
  },
  deleteMultiUser: (ids: any) => {
    const url = ADMIN_API + '/users/multiple'
    return axiosClient.delete(url, { data: ids })
  },
}

export default adminApi
