import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ApiError } from '../utils/ApiError.js'
import * as officeService from '../services/office_service.js'
import { pick } from '../utils/pick.js'

const createOffice = async (req: Request, res: Response) => {
  const user = await officeService.createOffice(req.body)
  res.status(httpStatus.CREATED).send(user)
}

const getOffices = async (req: Request, res: Response) => {
  const filter = pick(req.query, ['priority'])
  const options = pick(req.query, ['order', 'sort_field', 'per_page', 'page'])
  const office = await officeService.getAllOffices(filter, options)
  res.send(office)
}
const getOfficesList = async (req: Request, res: Response) => {
  const filter = pick(req.query, ['priority'])
  const options = pick(req.query, ['order', 'sort_field', 'per_page', 'page'])
  const office = await officeService.getAllOfficesList(filter, options)
  res.send(office)
}

const getOffice = async (req: Request, res: Response) => {
  const id = req.query.officeId
  const office = await officeService.getOfficeById(id)
  if (!office) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Office not found')
  }
  res.send(office)
}

const updateOffice = async (req: Request, res: Response) => {
  const office = await officeService.updateOfficeById(req.query.officeId, req.body)
  res.send(office)
}

const deleteOffice = async (req: Request, res: Response) => {
  const office = await officeService.deleteOfficeById(req.params.id)
  res.status(httpStatus.OK).send(office)
}

const setOfficeIntegration = async (req: Request, res: Response) => {
  const integration = await officeService.createIntegration(req.body)
  res.send(integration)
}

const getOfficeIntegration = async (req: Request, res: Response) => {
  const integration = await officeService.getOfficeIntegrationBuyOfficeId(req.query.id)

  if (!integration) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Integration not found')
  }
  res.send(integration)
}

const getOfficeIntegrations = async (req: Request, res: Response) => {
  const integrations = await officeService.getIntegrations(req.body)
  if (!integrations) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Integrations not found')
  }
  res.send(integrations)
}

const updateOfficeIntegration = async (req: Request, res: Response) => {
  const integration = await officeService.updIntegration(req.query.integrationId, req.body)
  if (!integration) {
    throw new ApiError(httpStatus.NOT_FOUND, 'An error when update')
  }
  res.status(httpStatus.OK).send(integration)
}

const deleteOfficeIntegration = async (req: Request, res: Response) => {
  await officeService.removeIntegration(req.body)
  res.status(httpStatus.NO_CONTENT).send()
}

const setOfficeGeo = async (req: Request, res: Response) => {
  const geo = await officeService.createGeo(req.body)
  if (!geo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Created successfully')
  }
  res.status(httpStatus.CREATED).send(geo)
}

const getOfficeGeo = async (req: Request, res: Response) => {
  const geo = await officeService.getGeo(req.body)
  if (!geo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Geo not found')
  }
  res.send(geo)
}

const getOfficeGeos = async (req: Request, res: Response) => {
  const geos = await officeService.getGeos(req.body)
  if (!geos) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Geos not found')
  }
  res.send(geos)
}

const updateOfficeGeo = async (req: Request, res: Response) => {
  const geo = await officeService.updateGeo(req.body)
  if (!geo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Geo have an error when update')
  }
  res.status(httpStatus.OK).send(geo)
}

const deleteOfficeGeo = async (req: Request, res: Response) => {
  const geo = await officeService.removeGeo(req.body)
  if (!geo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Geo removed')
  }
  res.status(httpStatus.NO_CONTENT).send(geo)
}

const setOfficeCheckStatus = async (req: Request, res: Response) => {
  const status = await officeService.setStatus(req.body)
  if (!status) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Created successfully')
  }
  res.status(httpStatus.CREATED).send(status)
}

const getOfficeCheckStatus = async (req: Request, res: Response) => {
  const status = await officeService.getStatus(req.body)
  if (!status) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Status not found')
  }
  res.send(status)
}

const updateOfficeCheckStatus = async (req: Request, res: Response) => {
  const status = await officeService.updStatus(req.body)
  if (!status) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Status have an error when update')
  }
  res.send(status)
}

const deleteOfficeCheckStatus = async (req: Request, res: Response) => {
  const status = await officeService.removeStatus(req.body)
  if (!status) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Status have an error when delete')
  }
  res.status(httpStatus.NO_CONTENT).send(status)
}

export {
  createOffice,
  getOffices,
  getOfficesList,
  getOffice,
  updateOffice,
  deleteOffice,
  setOfficeIntegration,
  getOfficeIntegration,
  getOfficeIntegrations,
  updateOfficeIntegration,
  deleteOfficeIntegration,
  setOfficeGeo,
  getOfficeGeo,
  getOfficeGeos,
  updateOfficeGeo,
  deleteOfficeGeo,
  setOfficeCheckStatus,
  getOfficeCheckStatus,
  updateOfficeCheckStatus,
  deleteOfficeCheckStatus,
}
