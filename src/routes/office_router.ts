import { Router } from 'express'
import { auth } from '../midelwares/auth.js'
import { Actions } from '../constants/roles_rights.js'
import { createOffice, getOffices, updateOffice, deleteOffice, getOffice } from '../validation/office_validation.js'
import * as officeController from '../controller/office_controller.js'
import { validate } from '../midelwares/validate.js'
import { catchAsync } from '../utils/catchAsync.js'

export const office_router = Router()

enum OfficeRoutes {
  CREATE = '/create',
  GET_LIST = '/offices-list',
  GET_OFFICE_BY_ID = '/office',
  UPDATE = '/update',
  DELETE = '/delete',
}

office_router.post(OfficeRoutes.CREATE, auth(), validate(createOffice), catchAsync(officeController.createOffice))

office_router.get(OfficeRoutes.GET_LIST, validate(getOffices), catchAsync(officeController.getOffices))
office_router.get(OfficeRoutes.GET_OFFICE_BY_ID, validate(getOffice), catchAsync(officeController.getOffice))

office_router.put(
  OfficeRoutes.UPDATE,
  auth(Actions.UPDATE_OFFICE),
  validate(updateOffice),
  catchAsync(officeController.updateOffice),
)

office_router.delete(
  OfficeRoutes.DELETE,
  auth(Actions.DELETE_OFFICE),
  validate(updateOffice),
  catchAsync(officeController.deleteOffice),
)
