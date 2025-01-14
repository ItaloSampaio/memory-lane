import { v7 as uuidv7 } from 'uuid'
import {
  createMemory,
  getMemoryById,
  listMemories,
  updateMemory,
  deleteMemoryById,
  insertMemoryImages,
  getMemoryImages,
  deleteMemoryImages,
} from '../repositories/memory-repository.js'
import { getMemoryLaneById } from '../repositories/memory-lane-repository.js'
import { uploadDirPath } from '../middlewares/upload-middleware.js'
import { deleteFiles } from '../utils/file-utils.js'
import path from 'path'

export const handleCreateMemory = (db) => async (req, res) => {
  const { laneId, title, description, timestamp } = req.body

  if (!laneId || !title || !description || !timestamp) {
    return res.status(400).json({
      error:
        'Please provide all required fields: laneId, title, description, timestamp.',
    })
  }

  if (!req.files || req.files.length === 0) {
    return res
      .status(400)
      .json({ error: 'A memory must have at least one image.' })
  }

  try {
    const lane = await getMemoryLaneById(db, laneId)
    if (!lane) {
      return res.status(404).json({ error: 'Memory lane not found' })
    }

    const id = uuidv7()
    await createMemory(db, { id, laneId, title, description, timestamp })

    const images = req.files.map((file) => ({
      id: uuidv7(),
      memoryId: id,
      filename: file.filename,
    }))
    await insertMemoryImages(db, images)

    const createdMemory = await getMemoryById(db, id)
    res.status(201).json(createdMemory)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const handleListMemories = (db) => async (req, res) => {
  const { laneId, sort } = req.query

  try {
    const memories = await listMemories(db, { laneId, sort })
    res.json(memories)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const handleGetMemory = (db) => async (req, res) => {
  const { id } = req.params

  try {
    const memory = await getMemoryById(db, id)
    if (!memory) {
      return res.status(404).json({ error: 'Memory not found' })
    }

    res.json(memory)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const handleUpdateMemory = (db) => async (req, res) => {
  const { id } = req.params
  const {
    title,
    description,
    timestamp,
    laneId,
    preserveImages = [],
  } = req.body

  if (!title || !description || !timestamp || !laneId) {
    return res.status(400).json({
      error:
        'Please provide all required fields: title, description, timestamp, laneId.',
    })
  }

  try {
    const lane = await getMemoryLaneById(db, laneId)
    if (!lane) {
      return res.status(404).json({ error: 'Memory lane not found' })
    }

    const updated = await updateMemory(db, {
      id,
      title,
      description,
      timestamp,
      laneId,
    })
    if (!updated) {
      return res.status(404).json({ error: 'Memory not found' })
    }

    const existingImages = await getMemoryImages(db, id)

    const preservedImageFilenames = preserveImages.map((image) =>
      image.split('/').pop()
    )
    const filenamesToDelete = existingImages
      .filter((image) => !preservedImageFilenames.includes(image.filename))
      .map((image) => image.filename)

    const totalImagesAfterUpdate =
      preserveImages.length + (req.files?.length ?? 0)

    if (totalImagesAfterUpdate === 0) {
      return res
        .status(400)
        .json({ error: 'A memory must have at least one image.' })
    }

    await deleteMemoryImages(db, { memoryId: id, filenames: filenamesToDelete })

    const filePaths = filenamesToDelete.map((filename) =>
      path.join(uploadDirPath, filename)
    )
    await deleteFiles(filePaths)

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => ({
        id: uuidv7(),
        memoryId: id,
        filename: file.filename,
      }))
      await insertMemoryImages(db, newImages)
    }

    const updatedMemory = await getMemoryById(db, id)
    res.json(updatedMemory)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const handleDeleteMemory = (db) => async (req, res) => {
  const { id } = req.params

  try {
    const memory = await getMemoryById(db, id)
    if (!memory) {
      return res.status(404).json({ error: 'Memory not found' })
    }

    const images = await getMemoryImages(db, id)
    const filenames = images.map((img) => img.filename)

    await deleteMemoryImages(db, { memoryId: id, filenames })

    const filePaths = filenames.map((filename) =>
      path.join(uploadDirPath, filename)
    )
    await deleteFiles(filePaths)

    await deleteMemoryById(db, id)

    res.json({ message: 'Memory deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
