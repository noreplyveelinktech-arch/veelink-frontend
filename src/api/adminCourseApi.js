import axiosClient from './axiosClient'
import { mapCourseFromApi, mapCoursesFromApi, mapCourseToApi } from '../utils/courseMapper'

const adminCourseApi = {
  createCourse: (payload) => axiosClient.post('/admin/courses', mapCourseToApi(payload)).then((response) => mapCourseFromApi(response.data)),
  getCourses: () => axiosClient.get('/admin/courses').then((response) => mapCoursesFromApi(response.data)),
  getCategories: () => axiosClient.get('/admin/course-categories').then((response) => response.data),
  getCourseById: (id) => axiosClient.get(`/admin/courses/${id}`).then((response) => mapCourseFromApi(response.data)),
  updateCourse: (id, payload) =>
    axiosClient.put(`/admin/courses/${id}`, mapCourseToApi(payload)).then((response) => mapCourseFromApi(response.data)),
  deleteCourse: (id) => axiosClient.delete(`/admin/courses/${id}`).then((response) => response.data),
  updateStatus: (id, status) =>
    axiosClient.patch(`/admin/courses/${id}/status`, { status }).then((response) => mapCourseFromApi(response.data)),
}

export default adminCourseApi
