import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ApiError } from '../utils/ApiError.js'
import * as userService from '../services/user_service.js'
import { pick } from '../utils/pick.js'

const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body)
  res.status(httpStatus.CREATED).send(user)
}

const getUsers = async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'role'])
  const options = pick(req.query, ['sortBy', 'limit', 'page'])
  const result = await userService.queryUsers(filter, options)
  res.send(result)
}

const getUser = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  res.send(user)
}

const updateUser = async (req: Request, res: Response) => {
  const user = await userService.updateUserById(req.params.userId, req.body)
  res.send(user)
}

const deleteUser = async (req: Request, res: Response) => {
  await userService.deleteUserById(req.params.userId)
  res.status(httpStatus.NO_CONTENT).send()
}

export { createUser, getUsers, getUser, updateUser, deleteUser }
