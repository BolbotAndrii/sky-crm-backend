import { Document } from 'mongoose'

export interface IGeo extends Document {
  type: string
  geos: []
  limit: number
  current_count: number
  active: boolean
  created_at: Date
  updated_at: Date
}
