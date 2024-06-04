//uploadFilesRouter
import {Router} from "express";
import uploadFiles from "./uploadFiles";
import uploadImage from "./uploadImage";
import authMiddleware from "@util/middlewares/authMiddleware";
import deletePostImage from "./deletePostImage";
import uploadPostImages from "./uploadPostImages";
import deletePostImages from "./deletePostImages";
import uploadProfileImage from "./uploadProfileImage";

const router = Router();

router.post('/uploadFiles',authMiddleware,uploadFiles);
router.post('/uploadImage',authMiddleware,uploadImage);
router.post('/uploadPostImages',authMiddleware,uploadPostImages);
router.post('/uploadProfileImage',authMiddleware,uploadProfileImage);
router.delete('/deletePostImage',authMiddleware,deletePostImage);
router.delete('/deletePostImages',authMiddleware,deletePostImages);

export default router;