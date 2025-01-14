import cors from 'cors'
import express from 'express'
import {
  handleCreateMemory,
  handleDeleteMemory,
  handleGetMemory,
  handleListMemories,
  handleUpdateMemory,
} from './controllers/memory-controller.js'
import {
  handleCreateMemoryLane,
  handleGetMemoryLane,
  handleListMemoryLanes,
  handleUpdateMemoryLane,
} from './controllers/memory-lane-controller.js'
import {
  handleCreateUser,
  handleGetUsers,
} from './controllers/user-controller.js'
import { initDB } from './database.js'
import { cleanUploadedFilesOnFailure } from './middlewares/clean-uploaded-files-on-failure-middleware.js'
import { logRequest } from './middlewares/logger-middleware.js'
import { upload, uploadDirPath } from './middlewares/upload-middleware.js'

const run = async () => {
  const app = express()
  const port = 4001

  app.use(cors())
  app.use(express.json())
  app.use('/images', express.static(uploadDirPath))

  app.use(logRequest)

  const db = await initDB()

  // Users
  app.post('/users', handleCreateUser(db))
  app.get('/users', handleGetUsers(db))

  // Memory Lanes
  app.post('/memory-lanes', handleCreateMemoryLane(db))
  app.get('/memory-lanes', handleListMemoryLanes(db))
  app.get('/memory-lanes/:id', handleGetMemoryLane(db))
  app.put('/memory-lanes/:id', handleUpdateMemoryLane(db))

  // Memories
  app.post(
    '/memories',
    upload.array('images'),
    cleanUploadedFilesOnFailure,
    handleCreateMemory(db)
  )
  app.get('/memories', handleListMemories(db))
  app.get('/memories/:id', handleGetMemory(db))
  app.put(
    '/memories/:id',
    upload.array('images'),
    cleanUploadedFilesOnFailure,
    handleUpdateMemory(db)
  )
  app.delete('/memories/:id', handleDeleteMemory(db))

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

run()
