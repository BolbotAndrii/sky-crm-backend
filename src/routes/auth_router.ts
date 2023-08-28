import { Router } from 'express'
import { auth } from '../midelwares/auth.js'
import { validate } from '../midelwares/validate.js'
import { login, logout } from '../validation/auth_validation.js'
import { catchAsync } from '../utils/catchAsync.js'
import * as authController from '../controller/auth_controller.js'

export const auth_router = Router()

auth_router.post('/login', validate(login), catchAsync(authController.login))
auth_router.post('/logout', auth(), validate(logout), catchAsync(authController.logout))
