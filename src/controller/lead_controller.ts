import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ApiError } from '../utils/ApiError.js'
import * as leadService from '../services/lead_service.js'
import { pick } from '../utils/pick.js'

const createLead = async (req: Request, res: Response) => {
  const user = await leadService.createLead(req.body)
  res.status(httpStatus.CREATED).send(user)
}

const getLeads = async (req: Request, res: Response) => {
  const filter = pick(req.query, ['first_name', 'role_id'])
  const options = pick(req.query, ['order', 'sort_field', 'per_page', 'page'])
  const office = await leadService.getAllLeads(filter, options)
  res.send(office)
}

const getLead = async (req: Request, res: Response) => {
  const id = req.query.LeadId
  const office = await leadService.getLeadById(id)
  if (!office) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lead not found')
  }
  res.send(office)
}

const updateLead = async (req: Request, res: Response) => {
  const office = await leadService.updateLeadById(req.params.userId, req.body)
  res.send(office)
}

const deleteLead = async (req: Request, res: Response) => {
  await leadService.deleteLeadById(req.params.officeId)
  res.status(httpStatus.NO_CONTENT).send()
}

export { createLead, getLeads, getLead, updateLead, deleteLead }
