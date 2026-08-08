import axiosClient from './axiosClient'

const authApi = {
  login: (payload) => axiosClient.post('/auth/login', payload).then((response) => response.data),
  me: () => axiosClient.get('/auth/me').then((response) => response.data),
  logout: () => axiosClient.post('/auth/logout').then((response) => response.data),
}

export default authApi
