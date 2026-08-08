import axiosClient from './axiosClient'

const adminUserApi = {
  createUser: (payload) => axiosClient.post('/admin/users', payload).then((response) => response.data),
  getUsers: () => axiosClient.get('/admin/users').then((response) => response.data),
  updateUser: (id, payload) => axiosClient.put(`/admin/users/${id}`, payload).then((response) => response.data),
  deleteUser: (id) => axiosClient.delete(`/admin/users/${id}`).then((response) => response.data),
}

export default adminUserApi
