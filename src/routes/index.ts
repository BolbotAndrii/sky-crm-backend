import { user_router } from './user_router.js'
import { auth_router } from './auth_router.js'

import { RequestHandler, Router } from 'express'

enum PathEnum {
  AUTH = '/auth',
  USER = '/user',
}

interface IRoutes {
  path: PathEnum
  route: RequestHandler
}

const router = Router()

const routes: IRoutes[] = [
  {
    path: PathEnum.AUTH,
    route: auth_router,
  },
  {
    path: PathEnum.USER,
    route: user_router,
  },
]

routes.forEach(({ path, route }) => router.use(path, route))

export { router }
