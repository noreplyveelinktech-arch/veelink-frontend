// Reconciles the backend AboutContent DTO field names (pageSubtitle,
// aboutDescription, aboutImageUrl) with the shorter names used across the
// frontend (AboutPage, AdminAboutContentForm, etc.)

export function mapAboutFromApi(data) {
  if (!data) return data

  return {
    ...data,
    subtitle: data.pageSubtitle ?? data.subtitle ?? '',
    description: data.aboutDescription ?? data.description ?? '',
    imageUrl: data.aboutImageUrl ?? data.imageUrl ?? '',
  }
}

export function mapAboutToApi(values) {
  if (!values) return values

  const { subtitle, description, imageUrl, ...rest } = values

  return {
    ...rest,
    pageSubtitle: subtitle ?? '',
    aboutDescription: description ?? '',
    aboutImageUrl: imageUrl ?? '',
  }
}

export default { mapAboutFromApi, mapAboutToApi }
