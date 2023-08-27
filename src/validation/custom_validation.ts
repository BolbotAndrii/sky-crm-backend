import { CustomHelpers, ErrorReport } from 'joi'

export const objectId = (value: string, helpers: CustomHelpers): string | ErrorReport => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.error('any.invalid')
  }
  return value
}

export const password = (value: string, helpers: CustomHelpers): string | ErrorReport => {
  if (value.length < 8) {
    return helpers.error('any.invalid')
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.error('any.invalid')
  }
  return value
}
