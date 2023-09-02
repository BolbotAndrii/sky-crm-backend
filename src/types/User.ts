export interface IUser {
  first_name: string
  last_name: string
  title: string
  phone: string
  email: string
  password: string
  user_logo: string
  status: number
  role_id: number
  background_color: string
  notes: string
  address: string
  user_identifier: string
  modules: {
    users: boolean
    dashboard: boolean
    leads: boolean
    trash: boolean
    offices: boolean
  }
}
