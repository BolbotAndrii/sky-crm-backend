import { Schema, model } from 'mongoose'
import { IUser } from '../types/userType.js'

const userModel = new Schema<IUser>(
  {
    full_name: { type: String, required: true },
    title: { type: String, required: false, default: '' },
    phone: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    user_logo: { type: String, required: false, default: '' },
    active: { type: Number, required: false, default: 1 },
    role_id: { type: Number, required: true, default: 1 },
    role_name: { type: String, required: true, default: 'AGENT' },
    background_color: { type: String, required: false, default: '#626ed4' },
    notes: { type: String, default: '', required: false },
    address: { type: String, default: '', required: false },
    user_identifier: { type: String, default: 'AM', required: true },
    permissions: {
      leads: { type: Boolean, required: false, default: true },
      deposits: { type: Boolean, required: false, default: true },
      analytics: { type: Boolean, required: false, default: true },
      settings: { type: Boolean, required: false, default: true },
      offices: { type: Boolean, required: false, default: true },
      dashboard: { type: Boolean, required: false, default: true },
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

const UsersModel = model<IUser>('Leads', userModel)

export { UsersModel }
