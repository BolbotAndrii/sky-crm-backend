import { Router } from 'express'
import { auth } from '../midelwares/auth.js'
import { Actions } from '../constants/roles_rights.js'
import { createUser, getUsers, updateUser, deleteUser } from '../validation/user_validation.js'
import * as userController from '../controller/user_controller.js'
import { validate } from '../midelwares/validate.js'
import { catchAsync } from '../utils/catchAsync.js'

export const user_router = Router()

enum UserRoutes {
  CREATE = '/create',
  GET_LIST = '/users-list',
  UPDATE = '/update',
  DELETE = '/delete',
}

//@ts-ignore
user_router.post(
  UserRoutes.CREATE,
  // auth(Actions.CREATE_USER),
  // validate(createUser),
  catchAsync(userController.createUser),
)
//@ts-ignore
user_router.get(UserRoutes.GET_LIST, auth(Actions.GET_USERS), validate(getUsers), catchAsync(userController.createUser))
//@ts-ignore
user_router.put(
  UserRoutes.UPDATE,
  auth(Actions.UPDATE_USER),
  validate(updateUser),
  catchAsync(userController.updateUser),
)
//@ts-ignore
user_router.delete(
  UserRoutes.DELETE,
  auth(Actions.DELETE_USER),
  validate(updateUser),
  catchAsync(userController.deleteUser),
)
