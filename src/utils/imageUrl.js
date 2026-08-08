// Utilities for the URL-based image approach used across the admin panel.
// Admins paste a public image URL (e.g. from Google Drive) instead of
// uploading binary/base64 image data, keeping the database lightweight.

const GOOGLE_DRIVE_FILE_PATTERNS = [
  /https?:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/(?:view|preview|edit)?/,
  /https?:\/\/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
  /https?:\/\/drive\.google\.com\/uc\?(?:export=[a-zA-Z]+&)?id=([a-zA-Z0-9_-]+)/,
]

/**
 * Converts a Google Drive "share" link into a direct, viewable image URL.
 * Example:
 *   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *   -> https://drive.google.com/uc?export=view&id=FILE_ID
 * Non Google-Drive URLs (or URLs that don't match a known share pattern) are
 * returned unchanged.
 */
export function toDirectImageUrl(url) {
  const value = (url || '').trim()
  if (!value) return value

  for (const pattern of GOOGLE_DRIVE_FILE_PATTERNS) {
    const match = value.match(pattern)
    if (match?.[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`
    }
  }

  return value
}

/** Basic structural validation - checks the value parses as an http(s) URL. */
export function isValidImageUrl(url) {
  const value = (url || '').trim()
  if (!value) return true // empty is allowed; required-ness is handled by the field itself

  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export default { toDirectImageUrl, isValidImageUrl }
