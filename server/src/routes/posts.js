import { Router } from 'express';
import {
  createPost,
  getPostById,
  getPosts,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.route('/').get(getPosts).post(authenticate, createPost);
router
  .route('/:id')
  .get(getPostById)
  .put(authenticate, updatePost)
  .delete(authenticate, deletePost);

export default router;

