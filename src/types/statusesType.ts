import { Document, Types } from 'mongoose'

export interface IStatuses extends Document {
  options: {
    url: string
    method: string
    content_type: string
  }
  office_data: {
    office_id: Types.ObjectId
    active: boolean
  }
  cron_task_data: {
    office_id: Types.ObjectId
    active: boolean
    interval: number
  }
  headers: {}

  template: {}

  date_format: string
  date_interval: string
  response: {
    autologin: string
    ext_status: string
  }
  created_at: Date
  updated_at: Date
}
