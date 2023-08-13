import { Router } from 'express'

import { getUsersList, createNewUser } from '../controller/usersController.js'

const router = Router()

router.post('/create', createNewUser)
router.get('/users-list', getUsersList)

export default router
