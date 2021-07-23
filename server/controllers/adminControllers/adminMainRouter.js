const express = require('express');
const router = express.Router();

const adminUsersRouter = require('./adminUsersRouter');
const adminSettingsRouter = require('./adminSettingsRouter');
const adminPostsRouter = require('./adminPostsRouter');
const adminWidgetsRouter = require('./adminWidgetsRouter');
const adminTerminalRouter = require('./adminTerminalRouter');
const adminFileManagerRouter = require('./adminFileManagerRouter');
const adminPagesRouter = require('./adminPagesRouter');
const adminFormsRouter = require('./adminFormsRouter');
const adminDataScrappersRouter = require('./adminDataScrappersRouter');
const adminOrdersRouter = require('./adminOrdersRouter');

router.use('/users',adminUsersRouter);
router.use('/posts',adminPostsRouter);
router.use('/settings',adminSettingsRouter);
router.use('/widgets',adminWidgetsRouter);
router.use('/terminal',adminTerminalRouter);
router.use('/fileManager',adminFileManagerRouter);
router.use('/pages',adminPagesRouter);
router.use('/forms',adminFormsRouter);
router.use('/scrapper',adminDataScrappersRouter);
router.use('/orders',adminOrdersRouter);

module.exports = router