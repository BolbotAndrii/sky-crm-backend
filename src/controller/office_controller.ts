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
  const filter = pick(req.query, ['first_name', 'role_id'])
  const options = pick(req.query, ['order', 'sort_field', 'per_page', 'page'])
  const office = await officeService.getAllOffices(filter, options)
  res.send(office)
}

const getOffice = async (req: Request, res: Response) => {
  const id = req.query.OfficeId
  const office = await officeService.getOfficeById(id)
  if (!office) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Office not found')
  }
  res.send(office)
}

const updateOffice = async (req: Request, res: Response) => {
  const office = await officeService.updateOfficeById(req.params.userId, req.body)
  res.send(office)
}

const deleteOffice = async (req: Request, res: Response) => {
  await officeService.deleteOfficeById(req.params.officeId)
  res.status(httpStatus.NO_CONTENT).send()
}

export { createOffice, getOffices, getOffice, updateOffice, deleteOffice }
