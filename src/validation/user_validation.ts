import Joi from 'joi'

import { password, objectId } from './custom_validation.js'

const createUser = {
  body: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role_id: Joi.number().required(),
    user_identifier: Joi.string().required(),
    background_color: Joi.string().allow(null),
    status: Joi.number().required(),
    phone: Joi.string().required(),
    title: Joi.string().allow(null),
    notes: Joi.string().allow(null),
    confirm: Joi.string().allow(null),
    modules: Joi.object({
      users: Joi.boolean().required().default(false),
      dashboard: Joi.boolean().required().default(false),
      leads: Joi.boolean().required().default(false),
      trash: Joi.boolean().required().default(false),
      offices: Joi.boolean().required().default(false),
    }).required(),
  }),
}

const getUsers = {
  query: Joi.object().keys({
    page: Joi.number().integer(),
    per_page: Joi.number().integer(),
    sort_field: Joi.string().allow(null),
    order: Joi.string().allow(null),
  }),
}

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
}

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required().email(),
      role_id: Joi.number().required(),
      user_identifier: Joi.string().required(),
    })
    .min(1),
}

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
}

export { createUser, getUsers, getUser, updateUser, deleteUser }
