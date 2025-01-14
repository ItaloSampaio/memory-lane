import { v7 as uuidv7 } from 'uuid'
import {
  createMemoryLane,
  getMemoryLaneById,
  listMemoryLanes,
  updateMemoryLane,
} from '../repositories/memory-lane-repository.js'
import { getUserById } from '../repositories/user-repository.js'

export const handleCreateMemoryLane = (db) => async (req, res) => {
  const { userId, title, description } = req.body

  if (!userId || !title || !description) {
    return res.status(400).json({
      error: 'Please provide all required fields: userId, title, description.',
    })
  }

  try {
    const user = await getUserById(db, userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const id = uuidv7()
    await createMemoryLane(db, { id, userId, title, description })

    const createdLane = await getMemoryLaneById(db, id)
    res.status(201).json(createdLane)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const handleListMemoryLanes = (db) => async (req, res) => {
  const { userId } = req.query

  try {
    const memoryLanes = await listMemoryLanes(db, { userId })
    res.json(memoryLanes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const handleGetMemoryLane = (db) => async (req, res) => {
  const { id } = req.params

  try {
    const memoryLane = await getMemoryLaneById(db, id)

    if (!memoryLane) {
      return res.status(404).json({ error: 'Memory lane not found' })
    }

    res.json(memoryLane)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const handleUpdateMemoryLane = (db) => async (req, res) => {
  const { id } = req.params
  const { title, description } = req.body

  if (!title || !description) {
    return res.status(400).json({
      error: 'Please provide all required fields: title, description.',
    })
  }

  try {
    const updated = await updateMemoryLane(db, { id, title, description })
    if (!updated) {
      return res.status(404).json({ error: 'Memory lane not found' })
    }

    const updatedLane = await getMemoryLaneById(db, id)
    res.json(updatedLane)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
