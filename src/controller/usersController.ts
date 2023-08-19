import { newUserService, usersListService, updateUserService, deleteUserService } from '../services/usersService.js'
import { Request, Response } from 'express'
export const getUsersListController = async (req: Request, res: Response) => {
  try {
    const result = await usersListService(req)
    return res.status(result.code).json(result)
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }
}

export const createNewUserController = async (req: Request, res: Response) => {
  try {
    const result = await newUserService(req.body)
    return res.status(result.code).json(result)
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }
}

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const result = await updateUserService(req.body)
    return res.status(result.code).json(result)
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }
}

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const result = await deleteUserService(req.body)
    return res.status(result.code).json(result)
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }
}
