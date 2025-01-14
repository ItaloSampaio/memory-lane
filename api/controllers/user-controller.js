import { v7 as uuidv7 } from 'uuid'
import {
  createUser,
  getUserById,
  getUsers,
} from '../repositories/user-repository.js'

export const handleCreateUser = (db) => async (_, res) => {
  try {
    const id = uuidv7()
    await createUser(db, { id })
    const createdUser = await getUserById(db, id)
    res.status(201).json(createdUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const handleGetUsers = (db) => async (_, res) => {
  try {
    const users = await getUsers(db)
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
