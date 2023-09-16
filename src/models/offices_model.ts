import { Document, Model, model, Schema } from 'mongoose'
import { IOffice } from '../types/officesType.js'
import { paginate } from '../plugin/paginate.js'
import { toJSON } from '../plugin/toJSON.js'

const offices_model = new Schema<IOffice>(
  {
    title: { type: String, required: false, default: '' },
    description: { type: String, required: false, default: '' },
    geo_limit: [
      {
        geo: { type: String, required: false, default: '' },
        limit: { type: Number, required: false, default: 0 },
      },
    ],
    priority: { type: Number, required: false, default: 0 },
    order: { type: Number, required: false, default: 0 },
    active: { type: Boolean, required: false, default: true },
    time_cards: {
      type: {
        time_start: String,
        time_end: String,
      },
      required: false,
      default: { time_start: '10:00', time_end: '19:00' },
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)
offices_model.plugin(paginate)
offices_model.plugin(toJSON)
export const office_model: Model<Document & IOffice> = model<Document & IOffice>('Offices', offices_model)
