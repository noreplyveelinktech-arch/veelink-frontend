import axiosClient from './axiosClient'
import { mapCompanyFromApi } from '../utils/companyMapper'

const companyApi = {
  getSettings: () => axiosClient.get('/public/company-settings').then((response) => mapCompanyFromApi(response.data)),
}

export default companyApi
