// Maps course objects between the backend DTO shape (courseName, courseDescription,
// courseImage, courseCategory, courseCategoryId, ...) and the shape the frontend
// components expect (name, description, imageUrl, category, categoryId, ...).
export const mapCourseFromApi = (course) => {
  if (!course) return course

  return {
    ...course,
    id: course.id,
    name: course.courseName ?? course.name,
    department: course.courseDepartment ?? course.department,
    category: course.courseCategory?.categoryName ?? course.category,
    categoryId: course.courseCategoryId ?? course.categoryId,
    imageUrl: course.courseImage ?? course.imageUrl,
    description: course.courseDescription ?? course.description,
    duration: course.duration,
    trainingMode: course.trainingMode,
    fee: course.fee,
    status: course.status,
    displayOrder: course.displayOrder,
  }
}

export const mapCoursesFromApi = (courses) => (Array.isArray(courses) ? courses.map(mapCourseFromApi) : [])

// Maps an admin course form's values back into the backend request DTO shape.
export const mapCourseToApi = (values = {}) => ({
  courseName: values.name,
  courseDepartment: values.department,
  courseCategoryId: values.categoryId ? Number(values.categoryId) : null,
  courseImage: values.imageUrl,
  courseDescription: values.description,
  duration: values.duration,
  trainingMode: values.trainingMode || null,
  fee: values.fee === '' || values.fee === null || values.fee === undefined ? null : Number(values.fee),
  status: values.status,
  displayOrder: Number(values.displayOrder || 0),
})

// Adds a friendly `courseName` alias (the enquiry snapshot field is called
// `interestedCourse` on the backend) so admin screens can read either name.
export const mapEnquiryFromApi = (enquiry) => {
  if (!enquiry) return enquiry
  return {
    ...enquiry,
    courseName: enquiry.interestedCourse ?? enquiry.courseName,
  }
}

export const mapEnquiriesFromApi = (enquiries) => (Array.isArray(enquiries) ? enquiries.map(mapEnquiryFromApi) : [])
