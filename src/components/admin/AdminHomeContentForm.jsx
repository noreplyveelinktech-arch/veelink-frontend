import { useState } from 'react'
import { GripVertical, Plus, Trash2 } from 'lucide-react'
import FormField from '../shared/FormField'
import ImageUrlField from '../shared/ImageUrlField'
import { createListItem } from '../../utils/helpers'

const sortItems = (items = []) => [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

function EditableList({ label, items, setItems }) {
  const updateItem = (id, key, value) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, [key]: value } : item)))
  }

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  return (
    <div className="rounded-[28px] border border-slate-200 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-950">{label}</h3>
        <button type="button" className="btn-secondary px-4 py-2" onClick={() => setItems((current) => [...current, createListItem({ order: current.length + 1 })])}>
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>
      <div className="space-y-4">
        {sortItems(items).map((item, index) => (
          <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-slate-700">
                <GripVertical className="h-4 w-4" />
                Card {index + 1}
              </div>
              <button type="button" className="rounded-xl p-2 text-rose-600" onClick={() => removeItem(item.id)}>
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Title" name={`title-${item.id}`} value={item.title} onChange={(event) => updateItem(item.id, 'title', event.target.value)} />
              <FormField label="Order" name={`order-${item.id}`} type="number" value={item.order} onChange={(event) => updateItem(item.id, 'order', Number(event.target.value))} />
              <div className="md:col-span-2">
                <FormField
                  label="Description"
                  name={`description-${item.id}`}
                  as="textarea"
                  rows={4}
                  value={item.description}
                  onChange={(event) => updateItem(item.id, 'description', event.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdminHomeContentForm({ initialValues, onSubmit, saving }) {
  const [formData, setFormData] = useState(initialValues)
  const [whyChooseUs, setWhyChooseUs] = useState(initialValues.whyChooseUs || [])
  const [trainingHighlights, setTrainingHighlights] = useState(initialValues.trainingHighlights || [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  return (
    <form
      className="space-y-6 rounded-[32px] bg-white p-6 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({ ...formData, whyChooseUs, trainingHighlights })
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="Hero Title" name="heroTitle" value={formData.heroTitle} onChange={handleChange} />
        <FormField label="Hero Subtitle" name="heroSubtitle" value={formData.heroSubtitle} onChange={handleChange} />
        <div className="md:col-span-2">
          <FormField label="Hero Description" name="heroDescription" as="textarea" rows={4} value={formData.heroDescription} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <ImageUrlField label="Hero Image URL" name="heroImageUrl" value={formData.heroImageUrl} onChange={handleChange} />
        </div>
        <FormField label="Primary Button Text" name="primaryButtonText" value={formData.primaryButtonText} onChange={handleChange} />
        <FormField label="Primary Button Link" name="primaryButtonLink" value={formData.primaryButtonLink} onChange={handleChange} />
        <FormField label="Secondary Button Text" name="secondaryButtonText" value={formData.secondaryButtonText} onChange={handleChange} />
        <FormField label="Secondary Button Link" name="secondaryButtonLink" value={formData.secondaryButtonLink} onChange={handleChange} />
      </div>

      <EditableList label="Why Choose Us Cards" items={whyChooseUs} setItems={setWhyChooseUs} />
      <EditableList label="Training Highlight Cards" items={trainingHighlights} setItems={setTrainingHighlights} />

      <div className="flex justify-end">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Home Content'}
        </button>
      </div>
    </form>
  )
}

export default AdminHomeContentForm
