export const createMemoryLane = async (
  db,
  { id, userId, title, description }
) => {
  await db.run(
    'INSERT INTO memory_lanes (id, userId, title, description) VALUES (?, ?, ?, ?)',
    [id, userId, title, description]
  )

  return db.get('SELECT * FROM memory_lanes WHERE id = ?', [id])
}

export const getMemoryLaneById = (db, id) => {
  return db.get('SELECT * FROM memory_lanes WHERE id = ?', [id])
}

export const listMemoryLanes = (db, { userId }) => {
  const conditions = []
  const params = []

  if (userId) {
    conditions.push('userId = ?')
    params.push(userId)
  }

  const query = `
    SELECT * FROM memory_lanes
    ${conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''}
  `

  return db.all(query, params)
}

export const updateMemoryLane = async (db, { id, title, description }) => {
  const result = await db.run(
    'UPDATE memory_lanes SET title = ?, description = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    [title, description, id]
  )

  return result.changes > 0
}
