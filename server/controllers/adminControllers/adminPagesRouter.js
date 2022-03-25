const express = require('express');
const router = express.Router();
// const authMiddleware = require('../../middlewares/authMiddleware')
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

//adminCreateNewPage
const adminCreateNewPage = require('./adminPagesControllers/adminCreateNewPage')
const adminUpdatePage = require('./adminPagesControllers/adminUpdatePage')
const adminGetPagesData = require('./adminPagesControllers/adminGetPagesData')
const adminDeleteCustomPage = require('./adminPagesControllers/adminDeleteCustomPage')
const adminGetPageData = require('./adminPagesControllers/adminGetPageData')

router.post('/createNewPage',adminAuthMiddleware,adminCreateNewPage)
router.post('/updatePage',adminAuthMiddleware,adminUpdatePage)
router.post('/getPagesData',adminAuthMiddleware,adminGetPagesData)
router.post('/deleteCustomPage',adminAuthMiddleware,adminDeleteCustomPage)
router.post('/getPageData',adminAuthMiddleware,adminGetPageData)

module.exports = router