import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ApiError } from '../utils/ApiError.js'
import * as analyticsService from '../services/analytics_service.js'

const getByLeads = async (req: Request, res: Response) => {
  const result = await analyticsService.getAnalyticsByLeads(req)
  // @ts-ignore
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Leads not found')
  }
  res.send(result)
}

const getByAffiliate = async (req: Request, res: Response) => {
  const result = await analyticsService.getAnalyticsByAffiliate(req)
  // @ts-ignore
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Affiliates not found')
  }
  res.send(result)
}

export { getByLeads, getByAffiliate }
