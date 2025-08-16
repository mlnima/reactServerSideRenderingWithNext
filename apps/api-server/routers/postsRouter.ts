import express, { Router } from 'express';
import { createPost } from '../controllers/posts';
import apiRequestMiddleware from '../middlewares/apiRequestMiddleware';

const router = Router();

router.post('/', apiRequestMiddleware, createPost);
// router.post('/posts', (req, res) => console.log(`Router=> `, req.body));

export default router;
