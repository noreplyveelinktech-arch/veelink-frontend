import axiosClient from './axiosClient'
import { mapHomeFromApi, mapHomeToApi } from '../utils/homeMapper'

const adminHomeApi = {
  getContent: () => axiosClient.get('/admin/home-content').then((response) => mapHomeFromApi(response.data)),
  updateContent: (payload) =>
    axiosClient.put('/admin/home-content', mapHomeToApi(payload)).then((response) => mapHomeFromApi(response.data)),
}

export default adminHomeApi
