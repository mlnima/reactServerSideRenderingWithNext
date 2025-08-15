import express, { Router } from 'express';

const router = Router();
import postRouter from './postsRouter';

router.use('/posts', postRouter);

export default router;
