import axiosClient from './axiosClient'

const adminAboutApi = {
  getContent: () => axiosClient.get('/admin/about-content').then((response) => response.data),
  updateContent: (payload) => axiosClient.put('/admin/about-content', payload).then((response) => response.data),
}

export default adminAboutApi
