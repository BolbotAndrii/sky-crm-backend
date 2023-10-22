export const replaceValuesInTemplate = (template, lead) => {
  const result = {}

  for (const key in template) {
    if (typeof template[key] === 'object') {
      result[key] = replaceValuesInTemplate(template[key], lead)
    } else if (typeof template[key] === 'string' && template[key].startsWith('[') && template[key].endsWith(']')) {
      const leadKey = template[key].slice(1, -1)
      result[key] = lead[leadKey] || template[key]
    } else {
      result[key] = template[key]
    }
  }

  return result
}
