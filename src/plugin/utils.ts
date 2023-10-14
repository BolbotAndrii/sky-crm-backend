const replaceValuesInObject = (source: any, replacement: any) => {
  if (typeof source === 'string' && source[0] === '[' && source[source.length - 1] === ']') {
    const key = source.slice(1, -1)
    if (replacement.hasOwnProperty(key)) {
      return replacement[key]
    } else {
      return source // Return the original string if key is not found in replacement
    }
  } else if (Array.isArray(source)) {
    for (let i = 0; i < source.length; i++) {
      source[i] = replaceValuesInObject(source[i], replacement)
    }
  } else if (typeof source === 'object') {
    for (const key in source) {
      source[key] = replaceValuesInObject(source[key], replacement)
    }
  }
  return source
}

export { replaceValuesInObject }
