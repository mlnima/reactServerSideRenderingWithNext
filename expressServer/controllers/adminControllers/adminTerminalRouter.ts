import {Router} from 'express';
import adminAuthMiddleware from '../../middlewares/adminAuthMiddleware';
import adminCommandExecutor from '../../middlewares/adminAuthMiddleware';

const router = Router();

router.post('/commandExecutor',adminAuthMiddleware,adminCommandExecutor)


export default router