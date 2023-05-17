import {Router} from 'express';
import {adminAuthMiddleware} from 'custom-server-util';
import adminGetOrders from './adminOdersControllers/adminGetOrders';

const router = Router();

router.post('/getOrders',adminAuthMiddleware,adminGetOrders);

export default router;