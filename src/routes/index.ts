import { user_router } from './user_router.js'
import { auth_router } from './auth_router.js'
import { lead_router } from './lead_router.js'
import { office_router } from './office_router.js'
import { analytics_router } from './analytics_router.js'

import { RequestHandler, Router } from 'express'

enum PathEnum {
  AUTH = '/auth',
  USER = '/user',
  OFFICE = '/office',
  LEAD = '/lead',
  ANALYTICS = '/dashboard',
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
  {
    path: PathEnum.OFFICE,
    route: office_router,
  },
  {
    path: PathEnum.LEAD,
    route: lead_router,
  },
  {
    path: PathEnum.ANALYTICS,
    route: analytics_router,
  },
]

routes.forEach(({ path, route }) => router.use(path, route))

export { router }
