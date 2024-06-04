import {Router} from 'express';
import adminAuthMiddleware from '@util/middlewares/adminAuthMiddleware';
import adminScrapYoutubeInfo from './adminDataScrappersControllers/adminScrapYoutubeInfo';

const router = Router();

router.post('/scrapYoutubeInfo', adminAuthMiddleware, adminScrapYoutubeInfo)


export default router