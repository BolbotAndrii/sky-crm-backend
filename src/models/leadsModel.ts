import mongoose, { Schema, model } from 'mongoose'
import { ILead } from '../types/leadsType.js'

const leadsModel = new Schema<ILead>({
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
  office_id: { type: mongoose.Types.ObjectId, required: false, default: null },
  params: { type: [], required: false, default: [] },
})

const LeadsModel = model<ILead>('Leads', leadsModel)

export { LeadsModel }
