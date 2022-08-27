import {Router} from 'express';
import adminAuthMiddleware from '../../middlewares/adminAuthMiddleware';
import adminGetFormsData from './adminFormsControllers/adminGetFormsData';
import adminGetFormData from './adminFormsControllers/adminGetFormData';
import adminDeleteFormData from './adminFormsControllers/adminDeleteFormData';

const router = Router();

router.post('/getFormsData',adminAuthMiddleware,adminGetFormsData);
router.post('/getFormData',adminAuthMiddleware,adminGetFormData);
router.post('/deleteFormData',adminAuthMiddleware,adminDeleteFormData);

export default router