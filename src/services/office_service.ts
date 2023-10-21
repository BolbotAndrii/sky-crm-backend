import httpStatus from 'http-status'
import { office_model as Office } from '../models/offices_model.js'
import { geo_model as Geo } from '../models/geo_model.js'
import { integration_model as Integration } from '../models/integration_model.js'
import { statuses_model as Statuses } from '../models/statuses_model.js'
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
  const integration = await Integration.findById(id)
  return integration
}

const getOfficeIntegrationBuyOfficeId = async (id: string) => {
  const integration = await Integration.findOne({ 'office_data.office_id': id })
  return integration
}

const getIntegrations = async (filter: FilterQuery<IOffice>, options: PaginationOptions) => {
  const integrations = await Integration.paginate(filter, options)
  return integrations
}

const updIntegration = async (integrationId: string, updateBody: Partial<IIntegration>) => {
  return Integration.findByIdAndUpdate(integrationId, updateBody, { new: true })
}

const removeIntegration = async () => {}

const createGeo = async (geoBody: IGeo) => {
  const filter = { office_id: geoBody.office_id }

  const existingGeo = await Geo.findOne(filter)

  if (existingGeo) {
    const updatedGeo = await Geo.findOneAndUpdate(filter, geoBody, { new: true })
    return updatedGeo
  } else {
    const newGeo = new Geo(geoBody)
    await newGeo.save()
    return newGeo
  }
}

const getGeo = async (officeId) => {
  const geo = await Geo.findOne({ office_id: officeId })

  return geo
}

const getGeos = async () => {}

const updateGeo = async (officeId, body) => {
  const filter = { office_id: officeId }

  const existingGeo = await Geo.findOne(filter)

  const updatedItems = existingGeo.items.map((item, index) => {
    return index < body.items.length ? { ...item._doc, ...body.items[index] } : item
  })

  existingGeo.items = updatedItems
  const updatedGeo = await Geo.findOneAndUpdate(filter, existingGeo, { new: true })

  return updatedGeo
}

const removeGeo = async (officeId, geoId) => {
  const filter = { office_id: officeId }
  const update = { $pull: { items: { _id: geoId } } }
  const result = await Geo.findOneAndUpdate(filter, update, { new: true })

  if (result && result.items.length === 0) {
    await Geo.findOneAndRemove(filter)
  }

  return result
}

const setStatus = async (body) => {
  const data = new Statuses(body)
  await data.save()
  return data
}

const getStatus = async (officeId) => {
  const statuses = await Statuses.findOne({ 'office_data.office_id': officeId })

  return statuses
}

const updStatus = async (updateBody) => {
  console.log(updateBody)
  const updatedStatusReq = await Statuses.findOneAndUpdate(
    { 'office_data.office_id': updateBody.office_data.office_id },
    updateBody,
    { new: true },
  )

  return updatedStatusReq
}

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
  getOfficeIntegrationBuyOfficeId,
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
