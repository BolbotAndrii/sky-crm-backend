import { ROLES } from './roles.js'

export enum Actions {
  CREATE_USER = 'create_user',
  UPDATE_USER = 'update_user',
  DELETE_USER = 'delete_user',
  GET_USERS = 'get_users',
}
const allRoles = {
  [ROLES.SUPER_ADMIN]: [],
  [ROLES.OWNER]: [],
  [ROLES.ADMIN]: [],
  [ROLES.MANAGER]: [],
  [ROLES.BAYER]: [],
  [ROLES.ACCOUNTANT]: [],
}

export const roleRights = new Map(Object.entries(allRoles))
