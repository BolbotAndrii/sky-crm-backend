import { Document, Types } from 'mongoose'

export interface IIntegration extends Document {
  headers: []
  url: string
  data: []
  active: boolean
  created_at: Date
  updated_at: Date
}
