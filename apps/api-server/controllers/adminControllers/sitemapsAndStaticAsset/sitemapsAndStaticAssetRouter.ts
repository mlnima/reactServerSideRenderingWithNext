import {Router} from 'express';
import {adminAuthMiddleware} from 'custom-server-util';
import generateSitemapsAndStaticAssets from "./generateSitemapsAndStaticAssets";

const router = Router();

router.post('/generateSitemapsAndStaticAsset',adminAuthMiddleware,generateSitemapsAndStaticAssets);

export default router