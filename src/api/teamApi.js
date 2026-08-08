import axiosClient from './axiosClient'

const teamApi = {
  getMembers: () => axiosClient.get('/public/team-members').then((response) => response.data),
}

export default teamApi
