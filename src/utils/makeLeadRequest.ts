import { ILead } from '../types/leadsType.js'
import { replaceValuesInTemplate } from './replaceValueInTemplate.js'
import axios from 'axios'
import { AxiosRequestConfig } from 'axios'

export const makeLeadRequest = (integration, lead: ILead) => {
  const { template, headers, options } = integration
  const body = replaceValuesInTemplate(template, lead)

  const axiosConfig: AxiosRequestConfig = {
    method: options.method,
    url: options.url,
    headers: { ...headers, 'Content-Type': 'application/json' },
    responseType: 'json',
    data: body,
  }

  return () => axios(axiosConfig)
}
