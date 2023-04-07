import {Router} from 'express';
import usersRouter from './usersRouter';
import settingsRouter from './settingsRouter';
import postsRouter from './postsRouter';
import chatroomsRouter from './chatroomsRouter';
import widgetsRouter from './widgetsRouter';
import clientFileManagerRouter from './clientFileManagerRouter';
import pagesRouter from './pagesRouter';
import formsRouter from './formsRouter';
import clientOrdersRouter from './clientOrdersRouter';

const router = Router();

router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/chatrooms', chatroomsRouter);
router.use('/settings', settingsRouter);
router.use('/widgets', widgetsRouter);
router.use('/fileManager', clientFileManagerRouter);
router.use('/pages', pagesRouter);
router.use('/forms', formsRouter);
router.use('/orders', clientOrdersRouter);

export default router;