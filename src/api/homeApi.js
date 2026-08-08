import axiosClient from './axiosClient'

const homeApi = {
  getContent: () => axiosClient.get('/public/home-content').then((response) => response.data),
}

export default homeApi
