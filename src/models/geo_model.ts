import { Document, Model, model, Schema } from 'mongoose'
import { IGeo } from '../types/geosType.js'
import { paginate } from '../plugin/paginate.js'
import { toJSON } from '../plugin/toJSON.js'

const geos_model = new Schema<IGeo>(
  {
    type: { type: String, required: false, default: '' },
    office_id: { type: Schema.Types.ObjectId, required: true, default: null },
    geos: { type: Array, required: false, default: [] },
    limit: { type: Number, required: false, default: 0 },
    current_count: { type: Number, required: false, default: 0 },
    active: { type: Boolean, required: false, default: true },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)
geos_model.plugin(paginate)
geos_model.plugin(toJSON)
export const geo_model: Model<Document & IGeo> = model<Document & IGeo>('Geos', geos_model)
