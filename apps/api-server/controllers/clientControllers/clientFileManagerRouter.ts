import {Router} from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import clientUserImageUpload from './clientFileManagerControllers/clientUserImageUpload';
import clientUserPostImageUpload from './clientFileManagerControllers/clientUserPostImageUpload';
import ugc_postImagesUpload from "./clientFileManagerControllers/ugc_postImagesUpload";
import ugc_postImageDelete from "./clientFileManagerControllers/ugc_postImageDelete";

const router = Router();

router.post('/userImageUpload', authMiddleware, clientUserImageUpload)
router.post('/userPostImageUpload', clientUserPostImageUpload)
router.post('/ugc_postImagesUpload', ugc_postImagesUpload)
//need to switch to delete
router.post('/ugc_postImageDelete', ugc_postImageDelete)

export default router