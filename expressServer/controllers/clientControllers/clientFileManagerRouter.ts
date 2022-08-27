import {Router} from 'express';
import authMiddleware from '../../middlewares/authMiddleware';
import clientUserImageUpload from './clientFileManagerControllers/clientUserImageUpload';
import clientUserPostImageUpload from './clientFileManagerControllers/clientUserPostImageUpload';

const router = Router();

router.post('/userImageUpload', authMiddleware, clientUserImageUpload)
router.post('/userPostImageUpload', clientUserPostImageUpload)

export default router