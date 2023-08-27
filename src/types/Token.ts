import mongoose, { Document, Model } from 'mongoose'

export interface IToken extends Document {
  token: string
  user: mongoose.Types.ObjectId
  expires: Date
  type: string
  blacklisted: boolean
}
