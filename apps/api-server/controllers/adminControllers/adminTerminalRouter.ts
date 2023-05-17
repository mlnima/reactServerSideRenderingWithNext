import {Router} from 'express';
import {adminAuthMiddleware} from 'custom-server-util';
import adminCommandExecutor from './adminTerminalControllers/adminCommandExecutor';

const router = Router();

router.post('/command',adminAuthMiddleware,adminCommandExecutor)


export default router