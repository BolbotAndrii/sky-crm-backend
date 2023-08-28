import mongoose from 'mongoose'

import httpStatus from 'http-status'

import { ApiError } from './ApiError.js'

import { logger } from './logger.js'

const errorConverter = (err, req, res, next) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode]
    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
  }

  res.locals.errorMessage = err.message

  const response = {
    status: statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  }

  if (process.env.NODE_ENV === 'development') {
    logger.error(err)
  }

  res.status(statusCode).send(response)
}

const errorNotFound = (req, res, next) => {
  return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
}

export { errorConverter, errorHandler, errorNotFound }
