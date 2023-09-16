import { Router } from 'express'
import { auth } from '../midelwares/auth.js'
import { Actions } from '../constants/roles_rights.js'
import { createLead, getLeads, updateLead, deleteLead, getLead } from '../validation/lead_validation.js'
import * as leadController from '../controller/lead_controller.js'
import { validate } from '../midelwares/validate.js'
import { catchAsync } from '../utils/catchAsync.js'

export const lead_router = Router()

enum LeadRoutes {
  CREATE = '/create',
  GET_LIST = '/leads-list',
  GET_LEAD_BY_ID = '/lead',
  UPDATE = '/update',
  DELETE = '/delete',
}

lead_router.post(LeadRoutes.CREATE, auth(), validate(createLead), catchAsync(leadController.createLead))

lead_router.get(LeadRoutes.GET_LIST, validate(getLeads), catchAsync(leadController.getLeads))
lead_router.get(LeadRoutes.GET_LEAD_BY_ID, validate(getLead), catchAsync(leadController.getLead))

lead_router.put(
  LeadRoutes.UPDATE,
  auth(Actions.UPDATE_LEAD),
  validate(updateLead),
  catchAsync(leadController.updateLead),
)

lead_router.delete(
  LeadRoutes.DELETE,
  auth(Actions.DELETE_LEAD),
  validate(updateLead),
  catchAsync(leadController.deleteLead),
)
