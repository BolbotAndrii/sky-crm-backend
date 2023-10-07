import { Document, Types } from 'mongoose'

export interface ILead extends Document {
  first_name: string
  last_name: string
  email: string
  phone: string
  lead_password: string
  country: string
  language: string
  domain: string
  click_id: string
  lang: string
  buyer: string
  account: string
  country_code: string
  offer: string
  comment: string
  geo: string
  ip: number
  phone_code: string
  current_status: number
  affilate: Types.ObjectId | null
  status: Types.ObjectId | null
  param_1: string
  param_2: string
  param_3: string
  param_4: string
  param_5: string
  param_6: string
  param_7: string
  param_8: string
  param_9: string
  param_10: string
  param_11: string
  param_12: string
  param_13: string
  param_14: string
  param_15: string
}
