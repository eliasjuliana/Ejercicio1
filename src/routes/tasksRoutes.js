import express from 'express';

import {
  deleteTask,
  getTasks,
  postTask,
  putTask,
} from '../controllers/taskControllers.js';

const router = express.Router();

// GET
router.get('/', getTasks);

// POST
router.post('/', postTask);

// PUT
router.put('/:id', putTask);

// DELETE
router.delete('/:id', deleteTask);

export default router;
