import { Document, Model, model, Schema, SchemaTypes } from 'mongoose'
import { IStatuses } from '../types/statusesType.js'
import { paginate } from '../plugin/paginate.js'
import { toJSON } from '../plugin/toJSON.js'

const status_cron_task_schema = new Schema<IStatuses>(
  {
    office_id: { type: Schema.Types.ObjectId, required: true },
    active: { type: Boolean, required: true, default: true },
    interval: { type: Number, required: true },
    request_options: {
      type: SchemaTypes.ObjectId,
      ref: 'Statuses',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

status_cron_task_schema.plugin(toJSON)
export const status_cron_task_model: Model<Document & IStatuses> = model<Document & IStatuses>(
  'StatusCronTask',
  status_cron_task_schema,
)
