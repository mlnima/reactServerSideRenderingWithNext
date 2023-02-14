import {Router} from 'express';
import adminAuthMiddleware from '../../middlewares/adminAuthMiddleware';
import getForms from './formsControllers/getForms';
import adminGetFormData from './formsControllers/adminGetFormData';
import adminDeleteFormData from './formsControllers/adminDeleteFormData';

const router = Router();

router.get('/getForms',adminAuthMiddleware,getForms);
router.post('/getFormData',adminAuthMiddleware,adminGetFormData);
router.post('/deleteFormData',adminAuthMiddleware,adminDeleteFormData);

export default router