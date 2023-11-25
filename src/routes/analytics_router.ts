import { Router } from 'express'
import { auth } from '../midelwares/auth.js'
import { catchAsync } from '../utils/catchAsync.js'
import * as analyticsController from '../controller/analytics_controller.js'

export const analytics_router = Router()

enum AnalyticsRoutes {
  GET_BY_LEADS = '/leads',
  GET_BY_AFF = '/affiliate',
}

analytics_router.get(AnalyticsRoutes.GET_BY_LEADS, auth(), catchAsync(analyticsController.getByLeads))
analytics_router.get(AnalyticsRoutes.GET_BY_AFF, auth(), catchAsync(analyticsController.getByAffiliate))
