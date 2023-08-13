import {Router } from 'express';

import {getUsersList}  from '../controller/usersController.js'


const router = Router()

router.get(
    '/users-list',
    getUsersList
)

export default router;