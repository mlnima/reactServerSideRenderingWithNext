import {Router} from 'express';
import {authMiddleware} from "custom-server-util";
import clientCreateOrder from './clientOrdersControllers/clientCreateOrder';

const router = Router();

router.post('/create/payPal', authMiddleware, clientCreateOrder)

export default router