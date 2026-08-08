import axiosClient from './axiosClient'

const adminHomeApi = {
  getContent: () => axiosClient.get('/admin/home-content').then((response) => response.data),
  updateContent: (payload) => axiosClient.put('/admin/home-content', payload).then((response) => response.data),
}

export default adminHomeApi
