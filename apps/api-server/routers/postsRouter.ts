import express, { Router } from 'express';
import { createPost } from '../controllers/posts';

const router = Router();

router.post('/', createPost);
// router.post('/posts', (req, res) => console.log(`Router=> `, req.body));

export default router;
