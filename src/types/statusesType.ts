import { Document, Types } from 'mongoose'

export interface IStatus extends Document {
  headers: []
  url: string
  data: []
  active: boolean
  created_at: Date
  updated_at: Date
}
