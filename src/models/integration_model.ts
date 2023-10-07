import { Document, Model, model, Schema } from 'mongoose'
import { IIntegration } from '../types/integrationType.js'
import { paginate } from '../plugin/paginate.js'
import { toJSON } from '../plugin/toJSON.js'

const integrations_model = new Schema<IIntegration>(
  {
    office_id: { type: Schema.Types.ObjectId, required: true, ref: 'Offices', default: null },
    headers: { type: Object, required: false },
    url: { type: String, required: false, default: '' },
    data: { type: Object, required: false },
    active: { type: Boolean, required: false, default: true },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)
integrations_model.plugin(paginate)
integrations_model.plugin(toJSON)
export const integration_model: Model<Document & IIntegration> = model<Document & IIntegration>(
  'Integrations',
  integrations_model,
)
