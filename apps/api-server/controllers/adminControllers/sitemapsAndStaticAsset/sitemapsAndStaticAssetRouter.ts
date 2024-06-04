import {Router} from 'express';
import adminAuthMiddleware from '@util/middlewares/adminAuthMiddleware';
import generateSitemapsAndStaticAssets from "./generateSitemapsAndStaticAssets";

const router = Router();

router.post('/generateSitemapsAndStaticAsset',adminAuthMiddleware,generateSitemapsAndStaticAssets);

export default router