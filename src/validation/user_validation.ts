import Joi from 'joi'

import { password, objectId } from './custom_validation.js'

const createUser = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role_id: Joi.number().required(),
    user_identifier: Joi.string().required(),
  }),
}

const getUsers = {
  query: Joi.object().keys({
    sort: Joi.string(),
    per_page: Joi.number().integer(),
    page: Joi.number().integer(),
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
