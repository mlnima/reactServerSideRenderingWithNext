import {Router} from 'express';
// import adminAuthMiddleware from '../../middlewares/adminAuthMiddleware';
import adminAuthMiddleware from 'custom-server-util/src/middleware-utils/adminAuthMiddleware';
import adminGetOrders from './adminOdersControllers/adminGetOrders';

const router = Router();

router.post('/getOrders',adminAuthMiddleware,adminGetOrders);

export default router;