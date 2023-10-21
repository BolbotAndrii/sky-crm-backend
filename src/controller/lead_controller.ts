import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ApiError } from '../utils/ApiError.js'
import * as leadService from '../services/lead_service.js'
import { pick } from '../utils/pick.js'
import { io } from '../sockets/socket_service.js'
import { CREATE_PUBLIC_LEAD } from '../sockets/constants.js'

const createPiblickLead = async (req: Request, res: Response) => {
  const lead = await leadService.createPublickLead(req.body)
  if (lead) {
    io.emit(CREATE_PUBLIC_LEAD, lead)
    return res.status(httpStatus.CREATED).send({ status: true })
  }
  res.status(httpStatus.BAD_REQUEST).send({ status: false })
}

const createLead = async (req: Request, res: Response) => {
  const user = await leadService.createLead(req.body)
  res.status(httpStatus.CREATED).send(user)
}

const getLeads = async (req: Request, res: Response) => {
  const filter = pick(req.query, [
    'created_at',
    'current_status',
    'account',
    'affilate',
    'buyer',
    'click_id',
    'comment',
    'country',
    'country_code',
    'domain',
    'email',
    'first_name',
    'geo',
    'ip',
    'language',
    'last_name',
    'lead_password',
    'offer',
    'phone',
    'phone_code',
  ])
  const options = pick(req.query, ['order', 'sort_field', 'per_page', 'page'])
  options.populate = 'status'
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
  const lead = await leadService.updateLeadById(req.query.leadId, req.body)
  res.status(httpStatus.OK).send(lead)
}

const deleteLead = async (req: Request, res: Response) => {
  await leadService.deleteLeadById(req.query.leadId)
  res.status(httpStatus.OK).send({ status: httpStatus.OK })
}

export { createLead, getLeads, getLead, updateLead, deleteLead, createPiblickLead }
