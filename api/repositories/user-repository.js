export const createUser = async (db, { id }) => {
  await db.run('INSERT INTO users (id) VALUES (?)', [id])
}

export const getUsers = (db) => {
  return db.all('SELECT * FROM users')
}

export const getUserById = (db, id) => {
  return db.get('SELECT * FROM users WHERE id = ?', [id])
}
