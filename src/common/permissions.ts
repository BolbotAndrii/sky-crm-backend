interface IPermissions {
  leads: number
  deposits: number
  analytics: number
  settings: number
  offices: number
  dashboard: number
}

export const PERMISSIONS: {
  ADMIN: IPermissions
  MANAGER: IPermissions
  BUYER: IPermissions
  WORKER: IPermissions
} = {
  ADMIN: {
    leads: 1,
    deposits: 1,
    analytics: 1,
    settings: 1,
    offices: 1,
    dashboard: 1,
  },
  MANAGER: {
    leads: 1,
    deposits: 1,
    analytics: 1,
    settings: 1,
    offices: 1,
    dashboard: 1,
  },
  BUYER: {
    leads: 1,
    deposits: 1,
    analytics: 1,
    settings: 0,
    offices: 0,
    dashboard: 1,
  },
  WORKER: {
    leads: 0,
    deposits: 0,
    analytics: 1,
    settings: 0,
    offices: 0,
    dashboard: 0,
  },
}
