import { Document, Types } from 'mongoose'

export interface IIntegration extends Document {
  options: {
    url: string
    method: string
    body_type: string
  }
  office_data: {
    office_id: Types.ObjectId
    active: boolean
  }
  headers: {}
  data: {}
  template: {}

  created_at: Date
  updated_at: Date
}
