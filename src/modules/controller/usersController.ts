import { newUser, usersList } from '../services/usersService.js'
import { Request, Response } from 'express'
export const getUsersList = async (req: Request, res: Response) => {
  try {
    const result = await usersList()
    return res.status(result.code).json(result)
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }
}

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const result = await newUser(req.body)
    return res.status(result.code).json(result)
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }
}
