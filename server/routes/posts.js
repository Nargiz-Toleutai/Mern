import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createPost, getAll, getById, getMyPosts, removePost, updatePost, getPostComments } from "../controllers/posts.js";

const router = new Router();
// Create post
// http://localhost:3001/api/posts
router.post('/', checkAuth, createPost);

// Get All posts
// http://localhost:3001/api/posts
router.get('/', getAll);

// Get posts by id
// http://localhost:3001/api/posts/:id
router.get('/:id', getById);

// Get my posts 
// http://localhost:3001/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts);

// Delete post
// http://localhost:3001/api/posts/:id
router.delete('/:id', checkAuth, removePost);

// Update post
// http://localhost:3001/api/posts/:id
router.put('/:id', checkAuth, updatePost);

// Get post comments
// http://localhost:3001/api/posts/comments/:id
router.get('/comments/:id', getPostComments);

export default router;