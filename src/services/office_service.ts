import httpStatus from 'http-status'
import { office_model as Office } from '../models/offices_model.js'
import { IOffice } from '../types/officesType.js'
import { ApiError } from '../utils/ApiError.js'
import { FilterQuery } from 'mongoose'

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

export { createOffice, getAllOffices, getOfficeById, updateOfficeById, deleteOfficeById }
