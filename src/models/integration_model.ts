import { Document, Model, model, Schema } from 'mongoose'
import { IIntegration } from '../types/integrationType.js'
import { paginate } from '../plugin/paginate.js'
import { toJSON } from '../plugin/toJSON.js'
import { office_model } from './offices_model.js'

const integrations_model = new Schema<IIntegration>(
  {
    office_data: {
      office_id: { type: Schema.Types.ObjectId, required: false, default: null },
      active: { type: Boolean, required: false, default: true },
    },
    options: {
      url: { type: String, required: false, default: true },
      method: { type: String, required: false, default: true },
      content_type: { type: String, required: false, default: true },
    },
    headers: { type: Object, required: false },
    template: { type: Object, required: false },
    response: {
      autologin: { type: String, required: false, default: true },
      ext_status: { type: String, required: false, default: true },
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

integrations_model.pre('save', async function () {
  const office = await office_model.findOne({ _id: this.office_data.office_id.toString() })

  if (office) {
    office.integrations = this._id
    await office.save()
  }
})
integrations_model.plugin(paginate)
integrations_model.plugin(toJSON)
export const integration_model: Model<Document & IIntegration> = model<Document & IIntegration>(
  'Integrations',
  integrations_model,
)
