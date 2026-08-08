import axiosClient from './axiosClient'

const adminTeamApi = {
  createMember: (payload) => axiosClient.post('/admin/team-members', payload).then((response) => response.data),
  getMembers: () => axiosClient.get('/admin/team-members').then((response) => response.data),
  updateMember: (id, payload) =>
    axiosClient.put(`/admin/team-members/${id}`, payload).then((response) => response.data),
  deleteMember: (id) => axiosClient.delete(`/admin/team-members/${id}`).then((response) => response.data),
}

export default adminTeamApi
