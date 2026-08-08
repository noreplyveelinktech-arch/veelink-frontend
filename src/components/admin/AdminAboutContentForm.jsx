import { useState } from 'react'
import FormField from '../shared/FormField'
import ImageUrlField from '../shared/ImageUrlField'

function AdminAboutContentForm({ initialValues, onSubmit, saving }) {
  const [formData, setFormData] = useState(initialValues)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  return (
    <form
      className="grid gap-5 rounded-[32px] bg-white p-6 shadow-sm md:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(formData)
      }}
    >
      <FormField label="Page Title" name="pageTitle" value={formData.pageTitle} onChange={handleChange} />
      <FormField label="Subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} />
      <div className="md:col-span-2">
        <FormField label="Description" name="description" as="textarea" rows={5} value={formData.description} onChange={handleChange} />
      </div>
      <div className="md:col-span-2">
        <FormField label="Mission" name="mission" as="textarea" rows={4} value={formData.mission} onChange={handleChange} />
      </div>
      <div className="md:col-span-2">
        <FormField label="Vision" name="vision" as="textarea" rows={4} value={formData.vision} onChange={handleChange} />
      </div>
      <ImageUrlField label="Image URL" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
      <FormField label="Values Title" name="valuesTitle" value={formData.valuesTitle} onChange={handleChange} />
      <div className="md:col-span-2 flex justify-end">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save About Content'}
        </button>
      </div>
    </form>
  )
}

export default AdminAboutContentForm
