const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../../middlewares/adminAuthMiddleware')

const adminScrapYoutubeInfo = require('./adminDataScrappersControllers/adminScrapYoutubeInfo')


router.post('/scrapYoutubeInfo',adminAuthMiddleware,adminScrapYoutubeInfo)


module.exports = router