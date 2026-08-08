import { useState } from 'react'
import FormField from '../shared/FormField'
import ImageUrlField from '../shared/ImageUrlField'

const toggleOptions = [
  { label: 'Enabled', value: 'true' },
  { label: 'Disabled', value: 'false' },
]

function AdminCompanySettingsForm({ initialValues, onSubmit, saving }) {
  const [formData, setFormData] = useState(initialValues)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  return (
    <form
      className="grid gap-5 rounded-[32px] bg-white p-6 shadow-sm sm:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({
          ...formData,
          studentConfirmationEnabled: formData.studentConfirmationEnabled === true || formData.studentConfirmationEnabled === 'true',
        })
      }}
    >
      <FormField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
      <FormField label="Tagline" name="tagline" value={formData.tagline} onChange={handleChange} />
      <ImageUrlField label="Logo URL" name="logoUrl" value={formData.logoUrl} onChange={handleChange} />
      <ImageUrlField label="Favicon URL" name="faviconUrl" value={formData.faviconUrl} onChange={handleChange} />
      <div className="sm:col-span-2">
        <FormField label="Short Description" name="shortDescription" value={formData.shortDescription} onChange={handleChange} />
      </div>
      <div className="sm:col-span-2">
        <FormField label="Long Description" name="longDescription" as="textarea" rows={5} value={formData.longDescription} onChange={handleChange} />
      </div>
      <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
      <FormField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
      <FormField label="WhatsApp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
      <FormField label="Working Hours" name="workingHours" value={formData.workingHours} onChange={handleChange} />
      <div className="sm:col-span-2">
        <FormField label="Address" name="address" as="textarea" rows={3} value={formData.address} onChange={handleChange} />
      </div>
      <div className="sm:col-span-2">
        <FormField label="Google Maps URL" name="googleMapsUrl" value={formData.googleMapsUrl} onChange={handleChange} />
      </div>
      <FormField label="Facebook URL" name="facebookUrl" value={formData.facebookUrl} onChange={handleChange} />
      <FormField label="Instagram URL" name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} />
      <FormField label="LinkedIn URL" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} />
      <FormField label="YouTube URL" name="youtubeUrl" value={formData.youtubeUrl} onChange={handleChange} />
      <FormField label="Twitter URL" name="twitterUrl" value={formData.twitterUrl} onChange={handleChange} />
      <FormField label="Enquiry Notification Email" name="enquiryNotificationEmail" value={formData.enquiryNotificationEmail} onChange={handleChange} />
      <FormField
        label="Primary Email"
        name="primaryEmail"
        type="email"
        value={formData.primaryEmail}
        onChange={handleChange}
        placeholder="veelinktechnologies@gmail.com"
      />
      <FormField
        label="No-Reply Email"
        name="noreplyEmail"
        type="email"
        value={formData.noreplyEmail}
        onChange={handleChange}
        placeholder="noreply.veelinktech@gmail.com"
      />
      <FormField label="CC Email" name="ccEmail" value={formData.ccEmail} onChange={handleChange} />
      <FormField label="BCC Email" name="bccEmail" value={formData.bccEmail} onChange={handleChange} />
      <FormField label="Email Sender Name" name="emailSenderName" value={formData.emailSenderName} onChange={handleChange} />
      <FormField
        label="Student Confirmation"
        name="studentConfirmationEnabled"
        as="select"
        value={String(formData.studentConfirmationEnabled)}
        onChange={handleChange}
        options={toggleOptions}
      />
      <div className="sm:col-span-2 flex justify-end">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  )
}

export default AdminCompanySettingsForm
