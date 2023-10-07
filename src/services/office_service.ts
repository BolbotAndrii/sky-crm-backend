import httpStatus from 'http-status'
import { office_model as Office } from '../models/offices_model.js'
import { integration_model as Integration } from '../models/integration_model.js'
import { IOffice } from '../types/officesType.js'
import { IIntegration } from '../types/integrationType.js'
import { ApiError } from '../utils/ApiError.js'
import { Document, FilterQuery } from 'mongoose'

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
const getAllOfficesList = async () => {
  const offices = await Office.find({}, '_id title').sort({ created_at: 1 })
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

  // @ts-ignore
  await office.save()
  return office
}

const deleteOfficeById = async (officeId: string) => {
  const office = await getOfficeById(officeId)
  if (!office) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Office not found')
  }
  // @ts-ignore
  await office.remove()
  return office
}

const createIntegration = async (integrationBody: IIntegration) => {
  return Integration.create({ ...integrationBody })
}
const getIntegration = async (id: string) => {
  return Integration.findById(id)
}

const getIntegrations = async (filter: FilterQuery<IOffice>, options: PaginationOptions) => {
  return await Integration.paginate(filter, options)
}

const updIntegration = async (data: any): Promise<Document | null> => {
  const updatedIntegration = await Integration.findOneAndUpdate(
    { _id: data.intId },
    { $set: updateQuery },
    { new: true },
  )
  return updatedIntegration
}

const removeIntegration = async () => {}

const createGeo = async () => {}
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
