import axiosClient from './axiosClient'
import { mapEnquiryFromApi, mapEnquiriesFromApi } from '../utils/courseMapper'

const adminEnquiryApi = {
  getEnquiries: () => axiosClient.get('/admin/enquiries').then((response) => mapEnquiriesFromApi(response.data)),
  getEnquiryById: (id) => axiosClient.get(`/admin/enquiries/${id}`).then((response) => mapEnquiryFromApi(response.data)),
  updateStatus: (id, status) =>
    axiosClient.patch(`/admin/enquiries/${id}/status`, { status }).then((response) => mapEnquiryFromApi(response.data)),
  deleteEnquiry: (id) => axiosClient.delete(`/admin/enquiries/${id}`).then((response) => response.data),
  resendEmail: (id) => axiosClient.post(`/admin/enquiries/${id}/resend-email`).then((response) => mapEnquiryFromApi(response.data)),
}

export default adminEnquiryApi
