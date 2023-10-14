const replaceValuesInObject = (source: any, replacement: any) => {
  if (Array.isArray(source)) {
    for (let i = 0; i < source.length; i++) {
      if (typeof source[i] === 'object') {
        replaceValuesInObject(source[i], replacement)
      } else if (replacement.hasOwnProperty(source[i])) {
        source[i] = replacement[source[i]]
      }
    }
  } else if (typeof source === 'object') {
    for (const key in source) {
      if (typeof source[key] === 'object') {
        replaceValuesInObject(source[key], replacement)
      } else if (replacement.hasOwnProperty(source[key])) {
        source[key] = replacement[source[key]]
      }
    }
  }
  return source
}

export { replaceValuesInObject }
