const express = require('express');
const router = express.Router();

const clientUsersRouter = require('./clientUsersRouter');
const clientSettingsRouter = require('./clientSettingsRouter');
const clientPostsRouter = require('./clientPostsRouter');
const clientWidgetsRouter = require('./clientWidgetsRouter');
const clientFileManagerRouter = require('./clientFileManagerRouter');
const clientPagesRouter = require('./clientPagesRouter');
const clientFormsRouter = require('./clientFormsRouter');
const clientOrdersRouter = require('./clientOrdersRouter');

router.use('/users',clientUsersRouter);
router.use('/posts',clientPostsRouter);
router.use('/settings',clientSettingsRouter);
router.use('/widgets',clientWidgetsRouter);
router.use('/fileManager',clientFileManagerRouter);
router.use('/pages',clientPagesRouter);
router.use('/forms',clientFormsRouter);
router.use('/orders',clientOrdersRouter);

module.exports = router