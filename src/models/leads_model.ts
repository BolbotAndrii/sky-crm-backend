import { Schema, model, Model, Document } from 'mongoose'
import { ILead } from '../types/leadsType.js'
import { paginate } from '../plugin/paginate.js'
import { toJSON } from '../plugin/toJSON.js'

const leadSchema = new Schema<ILead>({
  first_name: { type: String, required: false, default: '' },
  last_name: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  password: { type: String, required: false, default: '' },
  country: { type: String, required: false, default: '' },
  language: { type: String, required: false, default: '' },
  active: { type: Boolean, required: false, default: true },
  offer: { type: String, required: false, default: '' },
  comment: { type: String, required: false, default: '' },
  ip: { type: Number, required: false, default: 0 },
  office_id: { type: Schema.Types.ObjectId, required: false, default: null },
  params: { type: [], required: false, default: [] },
})

leadSchema.plugin(paginate)
leadSchema.plugin(toJSON)

export const lead_model: Model<Document & ILead> = model<Document & ILead>('Leads', leadSchema)
