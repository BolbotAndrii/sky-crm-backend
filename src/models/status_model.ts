import { Schema, model, Model, Document, Types } from 'mongoose'
import { IStatus } from '../types/StatusType.js'
import { STATUS } from '../constants/status.js'
import { toJSON } from '../plugin/toJSON.js'
import moment from 'moment'

const statusSchema = new Schema<IStatus>(
  {
    office_id: { type: Schema.Types.ObjectId, required: false, default: null },
    lead_id: { type: Schema.Types.ObjectId, required: false, default: null },
    statuses: [
      {
        status: { type: Number, required: true, default: STATUS.NEW },
        id: { type: String, required: true, default: () => new Types.ObjectId().toString() },
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

export const status_model: Model<Document & IStatus> = model<Document & IStatus>('Status', statusSchema)
