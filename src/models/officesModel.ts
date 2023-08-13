import { model, Schema } from 'mongoose'
import { IOffice } from '../types/officesType.js'

const officesModel = new Schema<IOffice>(
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

module.exports = model<IOffice>('Offices', officesModel)
