import { Schema, model } from 'mongoose'
import { IUser } from '../types/userType.js'
import { PERMISSIONS } from '../common/permissions.js'

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
    permissions: { type: Object, default: {} },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)
userModel.pre('save', function (next: () => void) {
  if (this.isModified('role_id')) {
    let permissions = {}

    switch (this.role_id) {
      case 1:
        permissions = PERMISSIONS.ADMIN
        break
      case 2:
        permissions = PERMISSIONS.MANAGER
        break
      case 3:
        permissions = PERMISSIONS.BUYER
        break
      case 4:
        permissions = PERMISSIONS.WORKER
        break
      default:
        permissions = {}
        break
    }

    this.permissions = permissions
  }
  next()
})
const UsersModel = model<IUser>('Leads', userModel)

export { UsersModel }
