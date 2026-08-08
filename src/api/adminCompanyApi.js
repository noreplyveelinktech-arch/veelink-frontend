import axiosClient from './axiosClient'
import { mapCompanyFromApi, mapCompanyToApi } from '../utils/companyMapper'

const adminCompanyApi = {
  getSettings: () => axiosClient.get('/admin/company-settings').then((response) => mapCompanyFromApi(response.data)),
  updateSettings: (payload) =>
    axiosClient.put('/admin/company-settings', mapCompanyToApi(payload)).then((response) => mapCompanyFromApi(response.data)),
}

export default adminCompanyApi
