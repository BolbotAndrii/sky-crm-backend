import { Document, Types } from 'mongoose'

export interface IStatus extends Document {
  office_id: null | Types.ObjectId
  headers: []
  url: string
  data: []
  active: boolean
  created_at: Date
  updated_at: Date
}
