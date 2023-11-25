import axios from 'axios'
import { AxiosRequestConfig } from 'axios'
import { io } from '../sockets/socket_service.js'
import { GETTING_LEAD_STATUS } from '../sockets/constants.js'
import { lead_model as Lead } from '../models/leads_model.js'
import { status_model as Status } from '../models/status_model.js'
import moment from 'moment'

async function findLeadByEmail(email) {
  const lead = await Lead.findOne({ email })

  return lead?._id
}

async function getStatusByIdAndUpdate(leadId, newExternalStatus) {
  const existingStatus = await Status.findOne({ lead_id: leadId })
  if (existingStatus) {
    existingStatus.external_statuses.push(newExternalStatus)
    await existingStatus.save()
  }
}

async function processArray(array) {
  for (const item of array) {
    const email = item.email
    const status = item.status

    try {
      const leadId = await findLeadByEmail(email)

      if (leadId) {
        const data = { status, json: JSON.stringify(item) }

        await getStatusByIdAndUpdate(leadId, data)
      }
    } catch (error) {
      console.error(error)
    }
  }
}

function transformData(data, keyMapping) {
  if (Array.isArray(data)) {
    const transformedData = []

    data.forEach((obj) => {
      const object = {}
      for (const key in keyMapping) {
        const sourceKey = keyMapping[key]
        if (obj[sourceKey]) {
          object[key] = obj[sourceKey]?.title || obj[sourceKey]
        }
      }
      transformedData.push(object)
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

function processDateObject(obj) {
  const currentDate = moment().toISOString()

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === '[date]') {
      if (key === 'from') {
        const dateInterval = obj.date_interval || 0
        obj[key] = moment().subtract(dateInterval, 'days').toISOString()
      } else if (key === 'to') {
        obj[key] = currentDate
      }
    }
  }

  return obj
}

export const makeStatusRequest = (integration) => {
  const { headers, options, response, template, date_interval = 1, date_format = 'MM/DD/YYYY' } = integration

  const params = processDateObject({ ...template, date_interval, date_format })

  const axiosConfig: AxiosRequestConfig = {
    method: options.method,
    url: options.url,
    headers: { ...headers, 'Content-Type': 'application/json' },
    responseType: 'json',
    params,
  }

  return () => {
    io.emit(GETTING_LEAD_STATUS, { message: `Lead status was updated sucessfully for :${options.url} ` })
    console.log(`cron is working for: ${options.url}`)
    axios(axiosConfig)
      .then((res) => {
        const data = transformData(res?.data?.data, response)

        return data
      })
      .then(processArray)
      .catch(console.log)
  }
}
