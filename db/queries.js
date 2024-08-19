const db = require('./pool');

// getPosts
async function getPosts() {
  const posts = await db.query(
    'SELECT * FROM posts JOIN users ON posts.user_id = users.id;'
  );
  return posts;
}
// createPost
async function addPost(post) {
  await db.query(
    'INSERT INTO posts (title, comment, user_id ) VALUES ($1, $2, $3);',
    [post.title, post.comment, post.user_id]
  );
}
// deletePost
async function deletePost(id) {
  await db.query('DELETE FROM posts WHERE id = $1;', [id]);
}

async function getUserByEmail(email) {
  const { rows } = await db.query(
    'SELECT * FROM users WHERE users.email = $1;',
    [email]
  );
  return rows[0];
}

async function getUserById(id) {
  const { rows } = await db.query('SELECT * FROM users WHERE users.id = $1;', [
    id,
  ]);
  return rows[0];
}
// createUser
// updateUser

module.exports = {
  getPosts,
  addPost,
  deletePost,
  getUserByEmail,
  getUserById,
};
