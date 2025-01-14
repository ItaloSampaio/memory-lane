export const createMemory = async (
  db,
  { id, laneId, title, description, timestamp }
) => {
  await db.run(
    'INSERT INTO memories (id, laneId, title, description, timestamp) VALUES (?, ?, ?, ?, ?)',
    [id, laneId, title, description, timestamp]
  )
}

export const getMemoryById = async (db, id) => {
  const row = await db.get(
    `
    SELECT memories.*, GROUP_CONCAT(memory_images.filename) AS images
    FROM memories
    LEFT JOIN memory_images ON memories.id = memory_images.memoryId
    WHERE memories.id = ?
    GROUP BY memories.id
    `,
    [id]
  )

  if (!row) {
    return
  }

  return mapFromDatabase(row)
}

export const listMemories = async (db, { laneId, sort }) => {
  const conditions = []
  const params = []
  let orderByClause = ''

  if (laneId) {
    conditions.push('memories.laneId = ?')
    params.push(laneId)
  }

  if (sort) {
    if (['timestamp_asc', 'timestamp_desc'].includes(sort)) {
      const direction = sort === 'timestamp_asc' ? 'ASC' : 'DESC'
      orderByClause = `ORDER BY memories.timestamp ${direction}`
    }
  }

  const query = `
    SELECT 
      memories.*, 
      GROUP_CONCAT(memory_images.filename) AS images
    FROM memories
    LEFT JOIN memory_images ON memories.id = memory_images.memoryId
    ${conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''}
    GROUP BY memories.id
    ${orderByClause}
  `

  const rows = await db.all(query, params)
  return rows.map(mapFromDatabase)
}

export const updateMemory = async (
  db,
  { id, title, description, timestamp, laneId }
) => {
  const result = await db.run(
    'UPDATE memories SET title = ?, description = ?, timestamp = ?, laneId = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    [title, description, timestamp, laneId, id]
  )

  return result.changes > 0
}

export const deleteMemoryById = async (db, id) => {
  await db.run('DELETE FROM memory_images WHERE memoryId = ?', [id])
  const result = await db.run('DELETE FROM memories WHERE id = ?', [id])
  return result.changes > 0
}

export const insertMemoryImages = async (db, images) => {
  const stmt = await db.prepare(
    'INSERT INTO memory_images (id, memoryId, filename) VALUES (?, ?, ?)'
  )
  for (const { id, memoryId, filename } of images) {
    await stmt.run(id, memoryId, filename)
  }

  await stmt.finalize()
}

export const getMemoryImages = async (db, memoryId) => {
  const query = `SELECT * FROM memory_images WHERE memoryId = ?`
  return db.all(query, [memoryId])
}

export const deleteMemoryImages = async (db, { memoryId, filenames }) => {
  if (filenames.length === 0) {
    return
  }

  const placeholders = filenames.map(() => '?').join(', ')
  const query = `
    DELETE FROM memory_images 
    WHERE memoryId = ? AND filename IN (${placeholders})
  `

  await db.run(query, [memoryId, ...filenames])
}

const mapFromDatabase = (row) => {
  return {
    ...row,
    images: row.images
      ? row.images.split(',').map((filename) => `/images/${filename}`)
      : [],
  }
}
