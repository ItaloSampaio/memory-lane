import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export const initDB = async () => {
  const db = await open({ filename: 'memories.db', driver: sqlite3.Database })

  db.run('PRAGMA foreign_keys = ON')

  db.getDatabaseInstance().serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        createdAt DATE DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATE DEFAULT CURRENT_TIMESTAMP
      )
    `)

    db.run(`
      CREATE TABLE IF NOT EXISTS memory_lanes (
        id TEXT PRIMARY KEY,
        userId TEXT,
        title TEXT,
        description TEXT,
        createdAt DATE DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id)
      )
    `)

    db.run(`
      CREATE TABLE IF NOT EXISTS memories (
        id TEXT PRIMARY KEY,
        laneId TEXT,
        title TEXT,
        description TEXT,
        timestamp DATE,
        createdAt DATE DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (laneId) REFERENCES memory_lanes(id)
      )
    `)

    db.run(`
      CREATE TABLE IF NOT EXISTS memory_images (
        id TEXT PRIMARY KEY,
        memoryId TEXT,
        filename TEXT,
        createdAt DATE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (memoryId) REFERENCES memories(id)
      )
    `)

    db.run(`
      CREATE INDEX IF NOT EXISTS idx_memory_lanes_userId ON memory_lanes (userId)
    `)

    db.run(`
      CREATE INDEX IF NOT EXISTS idx_memories_laneId_timestamp ON memories (laneId, timestamp)
    `)
  })

  return db
}
