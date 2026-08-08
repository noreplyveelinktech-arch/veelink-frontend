import axiosClient from './axiosClient'
import { mapCourseFromApi, mapCoursesFromApi } from '../utils/courseMapper'

const coursesApi = {
  getCourses: () => axiosClient.get('/public/courses').then((response) => mapCoursesFromApi(response.data)),
  getCourseById: (id) => axiosClient.get(`/public/courses/${id}`).then((response) => mapCourseFromApi(response.data)),
}

export default coursesApi
