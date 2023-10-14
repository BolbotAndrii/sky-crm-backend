import { Document, Types } from 'mongoose'

export interface IIntegration extends Document {
  options: {
    url: string
    method: string
    content_type: string
  }
  office_data: {
    office_id: Types.ObjectId
    active: boolean
  }
  headers: {}

  template: {}
  response: {
    autologin: string
    ext_status: string
  }
  created_at: Date
  updated_at: Date
}
