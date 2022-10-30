import {Router} from 'express';
import clientUsersRouter from './clientUsersRouter';
import clientSettingsRouter from './clientSettingsRouter';
import clientPostsRouter from './clientPostsRouter';
import clientWidgetsRouter from './clientWidgetsRouter';
import clientFileManagerRouter from './clientFileManagerRouter';
import clientPagesRouter from './clientPagesRouter';
import clientFormsRouter from './clientFormsRouter';
import clientOrdersRouter from './clientOrdersRouter';

const router = Router();

router.use('/users', clientUsersRouter);
router.use('/posts', clientPostsRouter);
router.use('/settings', clientSettingsRouter);
router.use('/widgets', clientWidgetsRouter);
router.use('/fileManager', clientFileManagerRouter);
router.use('/pages', clientPagesRouter);
router.use('/forms', clientFormsRouter);
router.use('/orders', clientOrdersRouter);

export default router;