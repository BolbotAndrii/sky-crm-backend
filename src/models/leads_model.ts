import { Schema, model, Model, Document } from 'mongoose'
import { ILead } from '../types/leadsType.js'
import { paginate } from '../plugin/paginate.js'
import { toJSON } from '../plugin/toJSON.js'

const leadSchema = new Schema<ILead>(
  {
    first_name: { type: String, required: true, default: '' },
    last_name: { type: String, required: true, default: '' },
    email: { type: String, required: true, default: '' },
    phone: { type: String, required: true, default: '' },
    phone_code: { type: String, required: false, default: '' },
    country: { type: String, required: true, default: '' },
    lead_password: { type: String, required: false, default: '' },
    language: { type: String, required: false, default: '' },
    offer: { type: String, required: false, default: '' },
    geo: { type: String, required: false, default: '' },
    domain: { type: String, required: false, default: '' },
    click_id: { type: String, required: false, default: '' },
    comment: { type: String, required: false, default: '' },
    buyer: { type: String, required: false, default: '' },
    country_code: { type: String, required: false, default: '' },
    account: { type: String, required: false, default: '' },
    ip: { type: String, required: false, default: '0.0.0.0' },
    current_status: { type: Number, required: false, default: 1 },
    affilate: { type: Schema.Types.ObjectId, required: false, default: null, ref: 'Office' },
    status: { type: Schema.Types.ObjectId, required: false, default: null, ref: 'Status' },
    param_1: { type: String, required: false, default: '' },
    param_2: { type: String, required: false, default: '' },
    param_3: { type: String, required: false, default: '' },
    param_4: { type: String, required: false, default: '' },
    param_5: { type: String, required: false, default: '' },
    param_6: { type: String, required: false, default: '' },
    param_7: { type: String, required: false, default: '' },
    param_8: { type: String, required: false, default: '' },
    param_9: { type: String, required: false, default: '' },
    param_10: { type: String, required: false, default: '' },
    param_11: { type: String, required: false, default: '' },
    param_12: { type: String, required: false, default: '' },
    param_13: { type: String, required: false, default: '' },
    param_14: { type: String, required: false, default: '' },
    param_15: { type: String, required: false, default: '' },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

leadSchema.plugin(paginate)
leadSchema.plugin(toJSON)

export const lead_model: Model<Document & ILead> = model<Document & ILead>('Leads', leadSchema)
