import { Document, Types } from 'mongoose'

export interface IOffice extends Document {
  title: string
  description: string
  geos: null | Types.ObjectId
  integration: null | Types.ObjectId
  status: null | Types.ObjectId
  priority: number
  order: number
  active: boolean
  time_cards: {
    time_start: string
    time_end: string
  }
  created_at: Date
  updated_at: Date
}
