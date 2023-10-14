import httpStatus from 'http-status'
import { office_model as Office } from '../models/offices_model.js'
import { geo_model as Geo } from '../models/geo_model.js'
import { integration_model as Integration } from '../models/integration_model.js'
import { IOffice } from '../types/officesType.js'
import { IIntegration } from '../types/integrationType.js'
import { ApiError } from '../utils/ApiError.js'
import { FilterQuery } from 'mongoose'
import { replaceValuesInObject } from '../plugin/utils.js'
import { IGeo } from '../types/geosType.js'
interface PaginationOptions {
  sortBy?: string
  limit?: string
  page?: string
  populate?: string
}

const createOffice = async (officeBody: IOffice) => {
  return Office.create({ ...officeBody })
}

const getAllOffices = async (filter: FilterQuery<IOffice>, options: PaginationOptions) => {
  const offices = await Office.paginate(filter, options)
  return offices
}
const getAllOfficesList = async (filter: FilterQuery<IOffice>, options: PaginationOptions) => {
  const offices = await Office.find({}, '_id title')
  return offices
}

const getOfficeById = async (id: string) => {
  return Office.findById(id)
}

const updateOfficeById = async (officeId: string, updateBody: Partial<IOffice>) => {
  const office = await getOfficeById(officeId)
  if (!office) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Office not found')
  }
  return Office.findByIdAndUpdate(officeId, updateBody, { new: true })
}

const deleteOfficeById = async (officeId: string) => {
  const office = await Office.findByIdAndRemove(officeId)
  if (!office) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Office not found')
  } else {
    return { message: 'Office was successfully removed' }
  }
}

const createIntegration = async (integrationBody: IIntegration) => {
  return Integration.create({ ...integrationBody })
}
const getIntegration = async (id: string) => {
  return Integration.findById(id)
}

const getIntegrations = async (filter: FilterQuery<IOffice>, options: PaginationOptions) => {
  const integrations = await Integration.paginate(filter, options)
  return integrations
}

const updIntegration = async () => {}

const removeIntegration = async () => {}

const createGeo = async (geoBody: IGeo) => {
  return Geo.create({ ...geoBody })
}

const getGeo = async () => {}

const getGeos = async () => {}

const updateGeo = async () => {}

const removeGeo = async () => {}

const setStatus = async () => {}

const getStatus = async () => {}

const updStatus = async () => {}

const removeStatus = async () => {}

export {
  createOffice,
  getAllOffices,
  getAllOfficesList,
  getOfficeById,
  updateOfficeById,
  deleteOfficeById,
  createIntegration,
  getIntegration,
  getIntegrations,
  updIntegration,
  removeIntegration,
  createGeo,
  getGeo,
  getGeos,
  updateGeo,
  removeGeo,
  setStatus,
  getStatus,
  updStatus,
  removeStatus,
}
