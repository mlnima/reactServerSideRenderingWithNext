import {Router} from 'express';
import adminAuthMiddleware from '../../middlewares/adminAuthMiddleware';
import adminScrapYoutubeInfo from './adminDataScrappersControllers/adminScrapYoutubeInfo';

const router = Router();

router.post('/scrapYoutubeInfo', adminAuthMiddleware, adminScrapYoutubeInfo)


export default router