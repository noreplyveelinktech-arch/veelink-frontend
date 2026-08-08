import axiosClient from './axiosClient'
import { mapEnquiriesFromApi } from '../utils/courseMapper'

const dashboardApi = {
  getStats: () =>
    axiosClient.get('/admin/dashboard/stats').then((response) => ({
      ...response.data,
      recentEnquiries: mapEnquiriesFromApi(response.data?.recentEnquiries),
    })),
}

export default dashboardApi
