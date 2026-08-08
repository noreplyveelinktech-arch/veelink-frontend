import axiosClient from './axiosClient'
import { mapCompanyFromApi } from '../utils/companyMapper'

const contactApi = {
  getContactDetails: () => axiosClient.get('/public/contact-details').then((response) => mapCompanyFromApi(response.data)),
}

export default contactApi
