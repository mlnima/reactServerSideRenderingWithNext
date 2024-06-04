import {Router} from 'express';
import adminAuthMiddleware from '@util/middlewares/adminAuthMiddleware';
import adminGetOrders from './adminOdersControllers/adminGetOrders';

const router = Router();

router.post('/getOrders',adminAuthMiddleware,adminGetOrders);

export default router;