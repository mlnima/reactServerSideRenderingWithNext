//uploadFilesRouter
import {Router} from "express";
import uploadFiles from "./uploadFiles";
import uploadImage from "./uploadImage";
import authMiddleware from "custom-server-util/src/middleware-utils/authMiddleware";

const router = Router();

router.post('/uploadFiles',authMiddleware,uploadFiles);
router.post('/uploadImage',authMiddleware,uploadImage);

export default router;