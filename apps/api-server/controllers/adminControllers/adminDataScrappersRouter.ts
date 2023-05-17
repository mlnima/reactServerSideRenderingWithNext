import {Router} from 'express';
import {adminAuthMiddleware} from 'custom-server-util';
import adminScrapYoutubeInfo from './adminDataScrappersControllers/adminScrapYoutubeInfo';

const router = Router();

router.post('/scrapYoutubeInfo', adminAuthMiddleware, adminScrapYoutubeInfo)


export default router