import axiosClient from './axiosClient'

const adminUploadApi = {
  // Uploads an image file to the backend, which forwards it to Cloudinary and
  // returns the resulting public URL. Used by ImageUrlField for direct file uploads.
  uploadImage: (file) => {
    const formData = new FormData()
    formData.append('file', file)

    return axiosClient
      .post('/admin/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => response.data.url)
  },
}

export default adminUploadApi
