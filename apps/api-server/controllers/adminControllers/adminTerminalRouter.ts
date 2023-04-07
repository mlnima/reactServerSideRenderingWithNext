import {Router} from 'express';
// import adminAuthMiddleware from '../../middlewares/adminAuthMiddleware';
import adminAuthMiddleware from 'custom-server-util/src/middleware-utils/adminAuthMiddleware';
import adminCommandExecutor from './adminTerminalControllers/adminCommandExecutor';

const router = Router();

router.post('/command',adminAuthMiddleware,adminCommandExecutor)


export default router