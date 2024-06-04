import {Router} from 'express';
import adminAuthMiddleware from '@util/middlewares/adminAuthMiddleware';
import adminCommandExecutor from './adminTerminalControllers/adminCommandExecutor';

const router = Router();

router.post('/command',adminAuthMiddleware,adminCommandExecutor)


export default router