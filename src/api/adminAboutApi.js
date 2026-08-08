import axiosClient from './axiosClient'
import { mapAboutFromApi, mapAboutToApi } from '../utils/aboutMapper'

const adminAboutApi = {
  getContent: () => axiosClient.get('/admin/about-content').then((response) => mapAboutFromApi(response.data)),
  updateContent: (payload) =>
    axiosClient.put('/admin/about-content', mapAboutToApi(payload)).then((response) => mapAboutFromApi(response.data)),
}

export default adminAboutApi
