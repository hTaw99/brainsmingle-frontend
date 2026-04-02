const FIELD_TYPE_DISPLAY_MAP: Record<string, string> = {
  RATIO: 'Radio',
  LINK: 'URL',
}

export const formatTextForDisplay = (text: string) => {
  if (!text) return ''
  const formatted = text.replace('_', ' ').toLowerCase()
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export const formatQuestionTypeForDisplay = (fieldType: string) => {
  return FIELD_TYPE_DISPLAY_MAP[fieldType] || formatTextForDisplay(fieldType)
}
