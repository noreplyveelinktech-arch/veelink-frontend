import { useEffect, useState } from 'react'
import FormField from '../shared/FormField'
import ImageUrlField from '../shared/ImageUrlField'

const trainingModes = [
  { label: 'Select Training Mode', value: '' },
  { label: 'Online', value: 'ONLINE' },
  { label: 'Offline', value: 'OFFLINE' },
  { label: 'Hybrid', value: 'HYBRID' },
]

const statuses = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Inactive', value: 'INACTIVE' },
]

function AdminCourseForm({ initialValues, categories = [], onSubmit, saving }) {
  const [formData, setFormData] = useState(initialValues)

  useEffect(() => {
    setFormData(initialValues)
  }, [initialValues])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const categoryOptions = [
    { label: 'Select Category', value: '' },
    ...categories.map((category) => ({ label: category.categoryName, value: String(category.id) })),
  ]

  return (
    <form
      className="grid gap-5 rounded-[32px] bg-white p-6 shadow-sm md:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({
          ...formData,
          fee: formData.fee === '' ? null : Number(formData.fee),
          displayOrder: Number(formData.displayOrder || 0),
        })
      }}
    >
      <FormField label="Course Name" name="name" value={formData.name} onChange={handleChange} required />
      <FormField label="Department" name="department" value={formData.department} onChange={handleChange} />
      <FormField
        label="Category"
        name="categoryId"
        as="select"
        value={formData.categoryId ? String(formData.categoryId) : ''}
        onChange={handleChange}
        options={categoryOptions}
      />
      <ImageUrlField label="Image URL" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
      <div className="md:col-span-2">
        <FormField label="Description" name="description" as="textarea" rows={6} value={formData.description} onChange={handleChange} />
      </div>
      <FormField label="Duration" name="duration" value={formData.duration} onChange={handleChange} />
      <FormField label="Training Mode" name="trainingMode" as="select" value={formData.trainingMode} onChange={handleChange} options={trainingModes} />
      <FormField label="Fee" name="fee" type="number" value={formData.fee} onChange={handleChange} />
      <FormField label="Status" name="status" as="select" value={formData.status} onChange={handleChange} options={statuses} />
      <FormField label="Display Order" name="displayOrder" type="number" value={formData.displayOrder} onChange={handleChange} />
      <div className="md:col-span-2 flex justify-end">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Course'}
        </button>
      </div>
    </form>
  )
}

export default AdminCourseForm
