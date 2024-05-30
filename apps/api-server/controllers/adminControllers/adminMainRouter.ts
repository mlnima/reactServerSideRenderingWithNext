import {Router} from 'express';
import adminUsersRouter from './users/usersRouter';
import adminSettingsRouter from './adminSettingsRouter';
import adminPostsRouter from './adminPostsRouter';
import adminWidgetsRouter from './widgets/adminWidgetsRouter';
import adminTerminalRouter from './adminTerminalRouter';
import adminFileManagerRouter from './adminFileManagerRouter';
import adminPagesRouter from './adminPagesRouter';
import adminFormsRouter from './forms/formsRouter';
import adminDataScrappersRouter from './adminDataScrappersRouter';
import adminOrdersRouter from './adminOrdersRouter';
import chatroomsRouter from "./chatrooms/chatroomsRouter";
import backupRouter from "./backup/backupRouter";
import sitemapsAndStaticAssetRouter from "./sitemapsAndStaticAsset/sitemapsAndStaticAssetRouter";

const router = Router();

router.use('/users',adminUsersRouter);
router.use('/backups',backupRouter);
router.use('/posts',adminPostsRouter);
router.use('/chatrooms',chatroomsRouter);
router.use('/settings',adminSettingsRouter);
router.use('/widgets',adminWidgetsRouter);
router.use('/terminal',adminTerminalRouter);
router.use('/fileManager',adminFileManagerRouter);
router.use('/pages',adminPagesRouter);
router.use('/forms',adminFormsRouter);
router.use('/scrapper',adminDataScrappersRouter);
router.use('/orders',adminOrdersRouter);
router.use('/sitemapsAndStaticAsset',sitemapsAndStaticAssetRouter);

export default router