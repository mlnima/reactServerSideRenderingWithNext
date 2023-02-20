//backupRouter
import {Router} from "express";
import adminAuthMiddleware from "../../../middlewares/adminAuthMiddleware";
import metas from "../backup/metas";

const router = Router();

router.post('/metas',adminAuthMiddleware,metas)

export default router