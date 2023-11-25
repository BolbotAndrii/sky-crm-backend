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
import { ext_status_model as ExtStatus } from '../models/ext_status_model.js'
interface PaginationOptions {
  sortBy?: string
  limit?: string
  page?: string
  populate?: string
}

function transformData(data, keyMapping) {
  if (Array.isArray(data)) {
    const transformedData = {}

    data.forEach((obj) => {
      for (const key in keyMapping) {
        const sourceKey = keyMapping[key]
        if (obj[sourceKey]) {
          transformedData[key] = obj[sourceKey]
        }
      }
    })

    return transformedData
  }

  if (typeof data === 'object') {
    const transformedData = {}

    for (const key in keyMapping) {
      const sourceKey = keyMapping[key]
      if (data?.[sourceKey]) {
        transformedData[key] = data[sourceKey]
      }
    }

    for (const key in data) {
      if (typeof data[key] === 'object' || Array.isArray(data[key])) {
        transformedData[key] = transformData(data[key], keyMapping)
      }
    }

    return transformedData
  }

  return false
}

function extractKeys(data, keysToReplace, result = {}) {
  if (Array.isArray(data)) {
    data.forEach((item) => extractKeys(item, keysToReplace, result))
  } else if (typeof data === 'object' && data !== null) {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] !== 'object' && data[key]) {
          result[key] = data[key]
        } else {
          extractKeys(data[key], keysToReplace, result)
        }
      }
    }
  }

  const responceKeys = {}

  for (let key in keysToReplace) {
    responceKeys[key] = result[keysToReplace[key]]
  }

  return responceKeys
}

const createPublickLead = async (leadBody: ILead) => {
  //create default status NOT SEND

  const newStatus = await Status.create({
    lead_id: null,
    statuses: [{ status: STATUS.TRASH }],
  })

  //create new Lead with status NOT SEND
  const newLead = await Lead.create({
    ...leadBody,
    status: newStatus.id,
    current_status: STATUS.TRASH,
  })

  const newExtStatus = await ExtStatus.create({
    lead_id: newLead._id,
  })

  //if data is invalid - save lead and return with status INVALID DATA

  if (!newLead) {
    newLead.current_status = STATUS.INVALID_DATA
    newStatus.statuses.push({ status: STATUS.INVALID_DATA })

    await newStatus.save()
    await newLead.save()
    return { lead: newLead, responce: { status: false, message: 'Not Send' } }
  }

  //find ability to send lead to matches office

  const { office } = await Geo.findBestMatch(leadBody.country, leadBody.offer)

  //if office not found - save lead and return
  if (!office) {
    newStatus.lead_id = newLead.id
    newLead.current_status = STATUS.NOT_FOUND_OFFICE
    newStatus.statuses.push({ status: STATUS.NOT_FOUND_OFFICE })
    await newStatus.save()
    await newLead.save()
    return { lead: newLead, responce: { status: false, message: 'Office not found' } }
  }

  //prepare data for request
  const request = await makeLeadRequest(office.integrations, newLead)

  //send data to office

  const res = await request()

  //got responce and parce it
  const parseResponce = extractKeys(res?.data, office.integrations.response)

  console.log(parseResponce)

  //if no responce or responve is invalid - save lead and return
  if (!parseResponce || !Object.values(parseResponce)?.length) {
    newStatus.lead_id = newLead.id
    newLead.current_status = STATUS.NOT_SEND
    newStatus.statuses.push({ status: STATUS.NOT_SEND })
    await newStatus.save()
    await newLead.save()
    return { lead: newLead, responce: { status: false, message: 'Not Send' } }
  }

  newStatus.lead_id = newLead.id
  newLead.current_status = STATUS.SUCCESS
  newStatus.statuses.push({ status: STATUS.SUCCESS })
  newExtStatus.office_id = office.id
  newExtStatus.statuses = [
    {
      json: JSON.stringify(res.data),
      ext_status: parseResponce?.ext_status || '',
      status: STATUS.SUCCESS,
    },
  ]
  await newExtStatus.save()
  await newStatus.save()
  await newLead.save()

  return { lead: newLead, responce: { ...parseResponce, data: res?.data?.data } }
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
