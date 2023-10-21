import { Router } from 'express'
import { auth } from '../midelwares/auth.js'
import { Actions } from '../constants/roles_rights.js'
import { createUser, getUsers, updateUser, deleteUser, getUser } from '../validation/user_validation.js'
import * as userController from '../controller/user_controller.js'
import { validate } from '../midelwares/validate.js'
import { catchAsync } from '../utils/catchAsync.js'

export const user_router = Router()

enum UserRoutes {
  CREATE = '/create',
  GET_LIST = '/users-list',
  GET_USER_BY_ID = '/user',
  UPDATE = '/update',
  DELETE = '/delete',
}

user_router.post(UserRoutes.CREATE, auth(), validate(createUser), catchAsync(userController.createUser))

user_router.get(UserRoutes.GET_LIST, auth(), validate(getUsers), catchAsync(userController.getUsers))
user_router.get(UserRoutes.GET_USER_BY_ID, validate(getUser), catchAsync(userController.getUser))

user_router.put(UserRoutes.UPDATE, auth(), validate(updateUser), catchAsync(userController.updateUser))

user_router.delete(UserRoutes.DELETE, auth(), validate(deleteUser), catchAsync(userController.deleteUser))
