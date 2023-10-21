import { Document, Types } from 'mongoose'

export interface IGeo extends Document {
  office_id: Types.ObjectId
  created_at: Date
  updated_at: Date
  items: {
    type: string
    geos: string[]
    limit: number
    current_count: number
    active: boolean
  }[]
}
