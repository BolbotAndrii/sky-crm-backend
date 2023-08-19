import { UsersModel } from '../models/usersModel.js'
import { IUser } from '../types/userType.js'
import { Request } from 'express'

export const usersListService = async (data: Request) => {
  try {
    const result: IUser[] = await UsersModel.find()

    if (result) {
      return {
        code: 200,
        status: true,
        data: result,
        message: 'success',
      }
    } else {
      return {
        code: 404,
        status: false,
        message: 'not found',
      }
    }
  } catch (e: any) {
    return {
      code: 500,
      status: false,
      message: e.message,
    }
  }
}
export const newUserService = async (data: IUser) => {
  try {
    const user = new UsersModel(data)

    const saveUser = await user.save()

    if (saveUser) {
      return {
        code: 200,
        status: true,
        data: saveUser,
        message: 'success',
      }
    } else {
      return {
        code: 400,
        status: false,
        message: 'bad request',
      }
    }
  } catch (e: any) {
    return {
      code: 500,
      status: false,
      message: e.message,
    }
  }
}
export const updateUserService = async (data: IUser) => {
  try {
    const user = new UsersModel(data)

    const saveUser = await user.save()

    if (saveUser) {
      return {
        code: 200,
        status: true,
        data: saveUser,
        message: 'success',
      }
    } else {
      return {
        code: 400,
        status: false,
        message: 'bad request',
      }
    }
  } catch (e: any) {
    return {
      code: 500,
      status: false,
      message: e.message,
    }
  }
}
export const deleteUserService = async (data: IUser) => {
  try {
    const user = new UsersModel(data)

    const saveUser = await user.save()

    if (saveUser) {
      return {
        code: 200,
        status: true,
        data: saveUser,
        message: 'success',
      }
    } else {
      return {
        code: 400,
        status: false,
        message: 'bad request',
      }
    }
  } catch (e: any) {
    return {
      code: 500,
      status: false,
      message: e.message,
    }
  }
}
