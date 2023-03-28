import { Router } from 'express'
const router = new Router()
import { checkAuth } from '../utils/checkAuth.js'
import { createComment } from '../controllers/comments.js'

// Create Comment
// http://localhost:3002/api/comments/:id
router.post('/:id', checkAuth, createComment);

// Delete post
// http://localhost:3001/api/posts/:id
// router.delete('/posts/comments/:id', checkAuth, removeComment);

// Update post
// http://localhost:3001/api/posts/:id
// router.put('/:id', checkAuth, updateComment);

export default router