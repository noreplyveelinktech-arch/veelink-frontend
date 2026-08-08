import { useRef, useState } from 'react'
import FormField from './FormField'
import { isValidImageUrl, toDirectImageUrl } from '../../utils/imageUrl'
import adminUploadApi from '../../api/adminUploadApi'
import { getErrorMessage } from '../../utils/helpers'

/**
 * Image field used across the admin panel (logo, banner, course, team, gallery
 * images, etc.). Supports two ways to set the value:
 * - Paste a public image URL directly (auto-converts Google Drive share links).
 * - Upload a file, which is sent to the backend -> Cloudinary and the returned
 *   URL is filled in automatically.
 * Either way, only a URL string is ever stored - never base64/binary data.
 */
function ImageUrlField({ label, name, value, onChange, required = false }) {
  const [previewError, setPreviewError] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef(null)

  const handleChange = (event) => {
    onChange(event)
    setPreviewError(false)
  }

  const handleBlur = (event) => {
    const converted = toDirectImageUrl(event.target.value)
    if (converted !== event.target.value) {
      onChange({ target: { name, value: converted } })
    }
  }

  const handleFileSelected = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = '' // allow re-selecting the same file later
    if (!file) return

    setUploadError('')
    setUploading(true)
    try {
      const url = await adminUploadApi.uploadImage(file)
      onChange({ target: { name, value: url } })
      setPreviewError(false)
    } catch (error) {
      setUploadError(getErrorMessage(error, 'Failed to upload image.'))
    } finally {
      setUploading(false)
    }
  }

  const trimmedValue = (value || '').trim()
  const validFormat = isValidImageUrl(trimmedValue)
  const showError = trimmedValue && !validFormat

  return (
    <div>
      <FormField
        label={label}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        placeholder="https://... or upload a file below"
        error={showError ? 'Enter a valid image URL (must start with http:// or https://).' : undefined}
      />

      <div className="mt-2 flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
          className="hidden"
          onChange={handleFileSelected}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? 'Uploading...' : 'Upload image'}
        </button>
        <span className="text-xs text-slate-400">JPG, PNG, WEBP, GIF or SVG, max 5 MB.</span>
      </div>
      {uploadError ? <p className="mt-2 text-sm text-rose-600">{uploadError}</p> : null}

      {trimmedValue && validFormat ? (
        <div className="mt-3 flex items-center gap-3">
          {!previewError ? (
            <img
              src={trimmedValue}
              alt={`${label} preview`}
              className="h-20 w-20 rounded-xl border border-slate-200 object-cover"
              onError={() => setPreviewError(true)}
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-dashed border-rose-300 bg-rose-50 text-center text-[11px] text-rose-500">
              Preview unavailable
            </div>
          )}
          <p className="text-xs text-slate-400">Preview - loaded directly from the pasted URL.</p>
        </div>
      ) : null}
    </div>
  )
}

export default ImageUrlField

