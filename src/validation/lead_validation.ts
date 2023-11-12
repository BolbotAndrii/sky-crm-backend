import Joi from 'joi'

import { objectId } from './custom_validation.js'

const createLead = {
  body: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    lead_password: Joi.string().allow(null),
    offer: Joi.string().required(),
    country: Joi.string().required(),
    affiliate: Joi.string().allow(null),
    language: Joi.string().allow(null),
    geo: Joi.string().allow(null),
    domain: Joi.string().allow(null),
    click_id: Joi.string().allow(null),
    comment: Joi.string().allow(null),
    ip: Joi.string().allow(null),
    affilate: Joi.string().custom(objectId),
    status: Joi.string().custom(objectId),
    current_status: Joi.number().allow(null),
    lang: Joi.string().allow(null),
    buyer: Joi.string().allow(null),
    account: Joi.string().allow(null),
    country_code: Joi.string().allow(null),
    phone_code: Joi.string().allow(null),
    param_1: Joi.string().allow(null),
    param_2: Joi.string().allow(null),
    param_3: Joi.string().allow(null),
    param_4: Joi.string().allow(null),
    param_5: Joi.string().allow(null),
    param_6: Joi.string().allow(null),
    param_7: Joi.string().allow(null),
    param_8: Joi.string().allow(null),
    param_9: Joi.string().allow(null),
    param_10: Joi.string().allow(null),
    param_11: Joi.string().allow(null),
    param_12: Joi.string().allow(null),
    param_13: Joi.string().allow(null),
    param_14: Joi.string().allow(null),
    param_15: Joi.string().allow(null),
  }),
}

const getLeads = {
  query: Joi.object().keys({
    page: Joi.number().integer(),
    per_page: Joi.number().integer(),
    sort_field: Joi.string().allow(null),
    order: Joi.string().allow(null),
  }),
}

const getLead = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
}

const updateLead = {
  query: Joi.object().keys({
    leadId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required().email(),
      lead_password: Joi.string().required(),
      phone: Joi.string().required(),
      language: Joi.string().allow(null),
      country: Joi.string().allow(null),
      geo: Joi.string().allow(null),
      offer: Joi.string().required(),
      domain: Joi.string().allow(null),
      click_id: Joi.string().allow(null),
      comment: Joi.string().allow(null),
      ip: Joi.number().allow(null),
      affilate: Joi.string().custom(objectId).allow(null),
      status: Joi.string().custom(objectId),
      current_status: Joi.number().allow(null),
      lang: Joi.string().allow(null),
      buyer: Joi.string().allow(null),
      account: Joi.string().allow(null),
      country_code: Joi.string().allow(null),
      phone_code: Joi.string().allow(null),

      param_1: Joi.string().allow(null),
      param_2: Joi.string().allow(null),
      param_3: Joi.string().allow(null),
      param_4: Joi.string().allow(null),
      param_5: Joi.string().allow(null),
      param_6: Joi.string().allow(null),
      param_7: Joi.string().allow(null),
      param_8: Joi.string().allow(null),
      param_9: Joi.string().allow(null),
      param_10: Joi.string().allow(null),
      param_11: Joi.string().allow(null),
      param_12: Joi.string().allow(null),
      param_13: Joi.string().allow(null),
      param_14: Joi.string().allow(null),
      param_15: Joi.string().allow(null),
    })
    .min(1),
}

const deleteLead = {
  params: Joi.object().keys({
    leadId: Joi.string().custom(objectId),
  }),
}

export { createLead, getLeads, getLead, updateLead, deleteLead }
