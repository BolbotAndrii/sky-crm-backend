import { Document, Types } from 'mongoose'

export interface IGeo extends Document {
  type: string
  geos: string
  limit: number
  current_count: number
  active: boolean
  office_id: Types.ObjectId
  created_at: Date
  updated_at: Date
}
