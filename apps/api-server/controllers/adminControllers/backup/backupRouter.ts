//backupRouter
import {Router} from "express";
import {adminAuthMiddleware} from 'custom-server-util';
import metas from "../backup/metas";

const router = Router();

router.post('/metas',adminAuthMiddleware,metas)

export default router