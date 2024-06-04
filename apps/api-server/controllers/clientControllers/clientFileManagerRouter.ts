import {Router} from 'express';
import authMiddleware from "@util/middlewares/authMiddleware";
import userProfileImageUpload from './clientFileManagerControllers/userProfileImageUpload';

const router = Router();

router.post('/userProfileImageUpload', authMiddleware, userProfileImageUpload)
export default router