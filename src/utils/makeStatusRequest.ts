import axios from 'axios'
import { AxiosRequestConfig } from 'axios'
import { io } from '../sockets/socket_service.js'
import { GETTING_LEAD_STATUS } from '../sockets/constants.js'
import { lead_model as Lead } from '../models/leads_model.js'
import { status_model as Status } from '../models/status_model.js'

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

  return {}
}

export const makeStatusRequest = (integration) => {
  const { headers, options, response, template } = integration

  const axiosConfig: AxiosRequestConfig = {
    method: options.method,
    url: options.url,
    headers: { ...headers, 'Content-Type': 'application/json' },
    responseType: 'json',
    params: template,
  }

  return () => {
    io.emit(GETTING_LEAD_STATUS, { message: `Lead status was updated sucessfully for :${options.url} ` })
    console.log(`cron is working for: ${options.url}`)
    axios(axiosConfig)
      .then((res) => transformData(res.data, response))
      .then((res) => console.log(res))
      .catch(console.log)
  } //need to add logic for update status in BD
}
