import { Document, Model, model, Schema } from 'mongoose'
import { IStatuses } from '../types/statusesType.js'
import { paginate } from '../plugin/paginate.js'
import { toJSON } from '../plugin/toJSON.js'
import { office_model } from './offices_model.js'

const statuses_schema = new Schema<IStatuses>(
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

statuses_schema.pre('save', async function () {
  const office = await office_model.findOne({ _id: this.office_data.office_id.toString() })

  if (office) {
    office.statuses = this._id
    await office.save()
  }
})
statuses_schema.plugin(paginate)
statuses_schema.plugin(toJSON)
export const statuses_model: Model<Document & IStatuses> = model<Document & IStatuses>('Statuses', statuses_schema)
