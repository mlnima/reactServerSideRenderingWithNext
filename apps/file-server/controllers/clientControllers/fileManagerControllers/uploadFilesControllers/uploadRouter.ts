//uploadFilesRouter
import {Router} from "express";
import uploadFiles from "./uploadFiles";
import uploadImage from "./uploadImage";

const router = Router();

router.post('/uploadFiles',uploadFiles);
router.post('/uploadImage',uploadImage);

export default router;