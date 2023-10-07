import { Document, Types } from 'mongoose'

export interface IStatus extends Document {
  office_id: Types.ObjectId | null
  lead_id: Types.ObjectId | null
  statuses: { status: number; id: Types.ObjectId; created_at: string }[]
}
