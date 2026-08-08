import axiosClient from './axiosClient'
import { mapAboutFromApi } from '../utils/aboutMapper'

const aboutApi = {
  getContent: () => axiosClient.get('/public/about-content').then((response) => mapAboutFromApi(response.data)),
}

export default aboutApi
