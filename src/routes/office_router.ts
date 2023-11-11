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
  GET_FULL_DATA_LIST = '/full-list',
  GET_OFFICE_BY_ID = '/office',
  UPDATE = '/update',
  DELETE = '/delete',
  ADD_INTEGRATION = '/integration/add',
  GET_INTEGRATION = '/integration/get',
  GET_INTEGRATION_BUY_OFFICE_ID = '/integration/get-by-office-id',
  GET_INTEGRATIONS = '/integration/list',
  UPDATE_INTEGRATION = '/integration/update',
  DELETE_INTEGRATION = '/integration/delete',
  ADD_GEO = '/geo/add',
  GET_GEO = '/geo/get',
  GET_GEOS = '/geo/list',
  UPDATE_GEO = '/geo/update',
  DELETE_GEO = '/geo/delete',
  ADD_STATUS_REQUEST = '/status/add',
  GET_STATUS_REQUEST = '/status/get',
  UPDATE_STATUS_REQUEST = '/status/update',
  DELETE_STATUS_REQUEST = '/status/delete',
}

// office
office_router.post(OfficeRoutes.CREATE, auth(), validate(createOffice), catchAsync(officeController.createOffice))
office_router.get(OfficeRoutes.GET_FULL_DATA_LIST, validate(getOffices), catchAsync(officeController.getOffices))
office_router.get(OfficeRoutes.GET_LIST, validate(getOffices), catchAsync(officeController.getOfficesList))
office_router.get(OfficeRoutes.GET_OFFICE_BY_ID, validate(getOffice), catchAsync(officeController.getOffice))
office_router.put(OfficeRoutes.UPDATE, auth(), catchAsync(officeController.updateOffice))

office_router.delete(OfficeRoutes.DELETE, auth(), catchAsync(officeController.deleteOffice))

// integrations
office_router.post(OfficeRoutes.ADD_INTEGRATION, catchAsync(officeController.setOfficeIntegration))
office_router.get(OfficeRoutes.GET_INTEGRATION, catchAsync(officeController.getOfficeIntegration))
office_router.get(OfficeRoutes.GET_INTEGRATION_BUY_OFFICE_ID, catchAsync(officeController.getOfficeIntegration))
office_router.get(OfficeRoutes.GET_INTEGRATIONS, catchAsync(officeController.getOfficeIntegrations))
office_router.put(OfficeRoutes.UPDATE_INTEGRATION, catchAsync(officeController.updateOfficeIntegration))
office_router.delete(OfficeRoutes.DELETE_INTEGRATION, catchAsync(officeController.deleteOfficeIntegration))

// geo
office_router.post(OfficeRoutes.ADD_GEO, catchAsync(officeController.setOfficeGeo))
office_router.get(OfficeRoutes.GET_GEO, catchAsync(officeController.getOfficeGeo))
office_router.get(OfficeRoutes.GET_GEOS, catchAsync(officeController.getOfficeGeos))
office_router.put(OfficeRoutes.UPDATE_GEO, catchAsync(officeController.updateOfficeGeo))
office_router.delete(OfficeRoutes.DELETE_GEO, catchAsync(officeController.deleteOfficeGeo))

// status
office_router.post(OfficeRoutes.ADD_STATUS_REQUEST, catchAsync(officeController.setOfficeCheckStatus))
office_router.get(OfficeRoutes.GET_STATUS_REQUEST, catchAsync(officeController.getOfficeCheckStatus))
office_router.put(OfficeRoutes.UPDATE_STATUS_REQUEST, catchAsync(officeController.updateOfficeCheckStatus))
office_router.delete(OfficeRoutes.DELETE_STATUS_REQUEST, catchAsync(officeController.deleteOfficeCheckStatus))
