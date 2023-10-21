import httpStatus from 'http-status'
import { user_model as User } from '../models/user_model.js' // Assuming User is the correct type for your user_model
import { IUser } from '../types/User.js'
import { ApiError } from '../utils/ApiError.js'
import { FilterQuery } from 'mongoose'

interface PaginationOptions {
  sortBy?: string
  limit?: string
  page?: string
  populate?: string
}

const createUser = async (userBody: IUser) => {
  if (await User.isEmailTaken(userBody?.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
  }

  const passwordHash = await User.brcPassHash(userBody.password)

  return User.create({ ...userBody, password: passwordHash })
}

const queryUsers = async (filter: FilterQuery<IUser>, options: PaginationOptions) => {
  const users = await User.paginate(filter, options)
  return users
}

const getUserById = async (id: string) => {
  return User.findById(id)
}

const getUserByEmail = async (email: string) => {
  return User.findOne({ email })
}

const updateUserById = async (userId: string, updateBody: Partial<IUser>) => {
  const user = await getUserById(userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
  }

  Object.assign(user, { ...updateBody, password: user.password })
  await user.save()
  return user
}

const deleteUserById = async (userId: string) => {
  return await User.findByIdAndDelete(userId)
}

export { createUser, queryUsers, getUserById, getUserByEmail, updateUserById, deleteUserById }
