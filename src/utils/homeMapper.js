// Reconciles the backend HomeContent DTOs with the shape the admin Home
// Content form works with. On GET, the backend already returns separate
// `whyChooseUs` / `highlights` arrays of HomeSectionDto (id, title,
// description, displayOrder, isActive, ...). On PUT, HomeContentRequestDto
// has no such separate fields - it only accepts a single flat `sections`
// list where each item carries a `sectionType` tag (WHY_CHOOSE_US,
// HIGHLIGHT, SUCCESS). This mapper translates both directions so the form
// can keep working with simple `whyChooseUs` / `trainingHighlights` lists.
import { normaliseArray } from './helpers'

const mapSectionFromApi = (section, index) => ({
  id: section.id,
  title: section.title || '',
  description: section.description || '',
  iconUrl: section.iconUrl || '',
  imageUrl: section.imageUrl || '',
  order: section.displayOrder ?? index + 1,
  isActive: section.isActive ?? true,
})

const mapSectionToApi = (sectionType) => (item, index) => ({
  sectionType,
  title: item.title || '',
  description: item.description || '',
  iconUrl: item.iconUrl || '',
  imageUrl: item.imageUrl || '',
  displayOrder: item.order ?? index + 1,
  isActive: item.isActive ?? true,
})

// Backend HomeSectionDto items (e.g. successSections, which the admin UI
// doesn't edit) are passed straight through unchanged so a save never wipes
// them out.
const passthroughSection = (section) => ({
  sectionType: section.sectionType,
  title: section.title,
  description: section.description,
  iconUrl: section.iconUrl,
  imageUrl: section.imageUrl,
  displayOrder: section.displayOrder,
  isActive: section.isActive,
})

export function mapHomeFromApi(data) {
  if (!data) return data

  return {
    ...data,
    whyChooseUs: normaliseArray(data.whyChooseUs).map(mapSectionFromApi),
    trainingHighlights: normaliseArray(data.highlights).map(mapSectionFromApi),
    successSections: normaliseArray(data.successSections),
  }
}

export function mapHomeToApi(values = {}) {
  const { whyChooseUs = [], trainingHighlights = [], successSections = [], ...rest } = values

  return {
    ...rest,
    sections: [
      ...whyChooseUs.map(mapSectionToApi('WHY_CHOOSE_US')),
      ...trainingHighlights.map(mapSectionToApi('HIGHLIGHT')),
      ...successSections.map(passthroughSection),
    ],
  }
}

export default { mapHomeFromApi, mapHomeToApi }
