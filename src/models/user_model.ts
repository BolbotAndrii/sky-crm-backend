import { Schema, model, Model, Document } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ROLES } from '../constants/roles.js'
import { IUser } from '../types/User.js'
import { paginate } from '../plugin/paginate.js'
import { toJSON } from '../plugin/toJSON.js'

const userSchema = new Schema<IUser>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    title: { type: String, required: false, default: '' },
    phone: { type: String, required: false },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    user_logo: { type: String, required: false, default: '' },
    status: { type: Number, required: false, default: 1 },
    role_id: { type: Number, required: true, default: ROLES.ADMIN },
    background_color: { type: String, required: false, default: '#626ed4' },
    notes: { type: String, default: '', required: false },
    address: { type: String, default: '', required: false },
    user_identifier: { type: String, default: 'AM', required: true },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

userSchema.statics.isEmailTaken = async function (email: string, excludeUserId: string): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } })
  return !!user
}

userSchema.statics.brcPassHash = async function (password: string): Promise<string> {
  return bcrypt.hash(password, 3)
}

userSchema.statics.verifyToken = async function (token: string): Promise<boolean> {
  return jwt.verify(token, process.env.JWT_SECRET)
}

userSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
  const user = this
  return bcrypt.compare(password, user.password)
}

userSchema.plugin(paginate)
userSchema.plugin(toJSON)

export const user_model: Model<Document & IUser> = model<Document & IUser>('User', userSchema)
