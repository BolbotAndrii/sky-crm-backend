import { Schema, model, Model, Document, Types } from 'mongoose'
import { IStatus } from '../types/StatusType.js'
import { STATUS } from '../constants/status.js'
import { toJSON } from '../plugin/toJSON.js'

const statusSchema = new Schema<IStatus & { ext_lead_id: string }>(
  {
    office_id: { type: Schema.Types.ObjectId, required: false, default: null },
    lead_id: { type: Schema.Types.ObjectId, required: true, default: null },
    ext_lead_id: { type: String, require: false, default: '' },
    statuses: [
      {
        status: { type: Number, required: true, default: '' },
        ext_status: { type: Object, require: false, default: {} },
        json: { type: String, require: false, default: '' },
        created_at: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

statusSchema.methods.updateStatus = async function (currentStatus) {
  if (this.statuses?.[0]?.status !== currentStatus) {
    const newStatus = {
      status: currentStatus,
    }
    this.statuses.unshift(newStatus)
    await this.save()
  }
}

statusSchema.plugin(toJSON)

export const ext_status_model: Model<Document & IStatus> = model<Document & IStatus>('ExtStatus', statusSchema)
