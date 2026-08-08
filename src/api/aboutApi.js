import axiosClient from './axiosClient'

const aboutApi = {
  getContent: () => axiosClient.get('/public/about-content').then((response) => response.data),
}

export default aboutApi
