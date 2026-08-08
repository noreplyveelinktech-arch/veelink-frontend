import axiosClient from './axiosClient'

const enquiryApi = {
  createEnquiry: (payload) => axiosClient.post('/public/enquiries', payload).then((response) => response.data),
}

export default enquiryApi
