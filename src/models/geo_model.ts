import { Document, Model, model, Schema } from 'mongoose'
import { IGeo } from '../types/geosType.js'
import { paginate } from '../plugin/paginate.js'
import { toJSON } from '../plugin/toJSON.js'
import { office_model } from './offices_model.js'

const geos_model = new Schema<IGeo>(
  {
    office_id: { type: Schema.Types.ObjectId, required: true, default: null },
    items: [
      {
        id: Schema.Types.ObjectId,
        country: { type: Array, required: true, default: [] },
        offer: { type: String, required: true, default: '' },
        limits: { type: Number, required: true, default: 0 },
        current_count: { type: Number, required: false, default: 0 },
        priority: { type: Number, required: false, default: 0 },
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

geos_model.pre('save', async function () {
  const office = await office_model.findOne({ _id: this.office_id.toString() })

  if (office) {
    office.geos = this._id
    await office.save()
  }
})

geos_model.statics.findBestMatch = async function (country, offer) {
  try {
    const matchingRecords = await this.find({
      items: {
        $elemMatch: {
          country: { $in: country },
          offer: offer,
        },
      },
    })

    if (matchingRecords.length === 0) {
      return {
        office: null,
      }
    }

    let highestPriorityRecord = matchingRecords[0]
    for (const record of matchingRecords) {
      if (record.items[0].priority > highestPriorityRecord.items[0].priority) {
        highestPriorityRecord = record
      }
    }

    const officeId = highestPriorityRecord.office_id

    const office = await office_model.findById(officeId).populate('geos').populate('statuses').populate('integrations')

    return { office }
  } catch (error) {
    console.error('Произошла ошибка:', error)
    throw error
  }
}

geos_model.plugin(paginate)
geos_model.plugin(toJSON)
export const geo_model: Model<Document & IGeo> = model<Document & IGeo>('Geos', geos_model)
