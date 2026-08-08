// Reconciles backend CompanySettings DTO field names with the simpler
// names used across the frontend (forms, ContactSection, CompanyContext, etc.)

export function mapCompanyFromApi(data) {
  if (!data) return data

  return {
    ...data,
    phone: data.phoneNumber ?? data.phone ?? '',
    whatsapp: data.whatsappNumber ?? data.whatsapp ?? '',
    ccEmail: data.enquiryCcEmail ?? data.ccEmail ?? '',
    bccEmail: data.enquiryBccEmail ?? data.bccEmail ?? '',
  }
}

export function mapCompanyToApi(values) {
  if (!values) return values

  const { phone, whatsapp, ccEmail, bccEmail, ...rest } = values

  return {
    ...rest,
    phoneNumber: phone ?? '',
    whatsappNumber: whatsapp ?? '',
    enquiryCcEmail: ccEmail ?? '',
    enquiryBccEmail: bccEmail ?? '',
  }
}

export default { mapCompanyFromApi, mapCompanyToApi }
