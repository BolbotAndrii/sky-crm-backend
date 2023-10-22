import httpStatus from 'http-status'
import { lead_model as Lead } from '../models/leads_model.js'
import { status_model as Status } from '../models/status_model.js'
import { ILead } from '../types/leadsType.js'
import { ApiError } from '../utils/ApiError.js'
import { FilterQuery, Types } from 'mongoose'
import { STATUS } from '../constants/status.js'
import { replaceValuesInObject } from '../plugin/utils.js'
import { geo_model as Geo } from '../models/geo_model.js'
import moment from 'moment'
import { makeLeadRequest } from '../utils/makeLeadRequest.js'
interface PaginationOptions {
  sortBy?: string
  limit?: string
  page?: string
  populate?: string
}

const createPublickLead = async (leadBody: ILead) => {
  const newStatus = await Status.create({
    lead_id: null,
    statuses: [{ status: STATUS.NOT_SEND }],
  })

  const newLead = await Lead.create({
    ...leadBody,
    status: newStatus.id,
    current_status: STATUS.NOT_SEND,
  })

  const { highestPriorityRecord, office, matchingItem } = await Geo.findBestMatch(leadBody.country, leadBody.offer)

  if (!office) {
    newStatus.lead_id = newLead.id
    await newStatus.save()
    return newLead
  }

  const request = makeLeadRequest(office.integrations, newLead)
  // const res = await request()

  // console.log(res)
  return newLead
}

const sendLeadToOffice = async (data: object) => {}

const findAvailOffice = async (data: object) => {}

const createLead = async (leadBody: ILead) => {
  return Lead.create({ ...leadBody })
}

const getAllLeads = async (filter: FilterQuery<ILead>, options: PaginationOptions) => {
  const leads = await Lead.paginate(filter, options)
  return leads
}

const getLeadById = async (id: string) => {
  return Lead.findById(id)
}

const updateLeadById = async (leadId: string, updateBody: Partial<ILead>) => {
  if (!leadId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lead not found')
  }
  const status = await Status.findOne({ lead_id: leadId })

  if (status) {
    await status.updateStatus(updateBody.current_status)
  }

  const lead = await Lead.findByIdAndUpdate(leadId, updateBody, { new: true })

  if (!lead) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lead not found')
  }

  // @ts-ignore

  return lead
}

const deleteLeadById = async (leadId: string) => {
  await Lead.findByIdAndDelete(leadId)
}

export { createLead, getAllLeads, getLeadById, updateLeadById, deleteLeadById, createPublickLead }
