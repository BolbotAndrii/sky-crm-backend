import Joi from 'joi'

import { objectId } from './custom_validation.js'

const createOffice = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    priority: Joi.number(),
    active: Joi.boolean(),
    time_cards: Joi.object(),
  }),
}

const getOffices = {
  query: Joi.object().keys({
    page: Joi.number().integer(),
    per_page: Joi.number().integer(),
    sort_field: Joi.string().allow(null),
    order: Joi.string().allow(null),
  }),
}

const getOffice = {
  params: Joi.object().keys({
    officeId: Joi.string().custom(objectId),
  }),
}

const updateOffice = {
  params: Joi.object().keys({
    officeId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      priority: Joi.number().required(),
      active: Joi.boolean().required(),
    })
    .min(1),
}

const deleteOffice = {
  params: Joi.object().keys({
    officeId: Joi.string().custom(objectId),
  }),
}

export { createOffice, getOffices, getOffice, updateOffice, deleteOffice }
