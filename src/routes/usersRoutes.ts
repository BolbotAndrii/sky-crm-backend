import { Router } from 'express'

import {
  getUsersListController,
  createNewUserController,
  updateUserController,
  deleteUserController,
} from '../controller/usersController.js'

const router = Router()

router.post('/create', createNewUserController)
router.get('/users-list', getUsersListController)
router.put('/update', updateUserController)
router.delete('/delete', deleteUserController)

export default router
