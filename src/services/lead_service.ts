import httpStatus from 'http-status'
import { lead_model as Lead } from '../models/leads_model.js'
import { ILead } from '../types/leadsType.js'
import { ApiError } from '../utils/ApiError.js'
import { FilterQuery } from 'mongoose'

interface PaginationOptions {
  sortBy?: string
  limit?: string
  page?: string
  populate?: string
}

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
  const lead = await getLeadById(leadId)
  if (!lead) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lead not found')
  }

  // @ts-ignore

  await lead.save()
  return lead
}

const deleteLeadById = async (leadId: string) => {
  const lead = await getLeadById(leadId)
  if (!lead) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lead not found')
  }
  // @ts-ignore
  await lead.remove()
  return lead
}

export { createLead, getAllLeads, getLeadById, updateLeadById, deleteLeadById }
