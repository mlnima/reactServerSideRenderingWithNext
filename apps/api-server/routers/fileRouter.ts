import { Router } from 'express';
import VideoStreamController from '../controllers/VideoStreamController';
import videoStreamVerifyMiddleware from '../middlewares/videoStreamVerifyMiddleware';

const router = Router();

router.get('/videos/*', videoStreamVerifyMiddleware, VideoStreamController.streamVideo);

export default router;
