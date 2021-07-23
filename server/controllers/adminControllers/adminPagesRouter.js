const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware')
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

//adminCreateNewPage
const adminCreateNewPage = require('./adminPagesControllers/adminCreateNewPage')
const adminUpdatePage = require('./adminPagesControllers/adminUpdatePage')
const adminGetPagesData = require('./adminPagesControllers/adminGetPagesData')
const adminDeletePage = require('./adminPagesControllers/adminDeletePage')

router.post('/createNewPage',adminAuthMiddleware,adminCreateNewPage)
router.post('/updatePage',adminAuthMiddleware,adminUpdatePage)
router.post('/getPagesData',adminAuthMiddleware,adminGetPagesData)
router.post('/deletePage',adminAuthMiddleware,adminDeletePage)

module.exports = router