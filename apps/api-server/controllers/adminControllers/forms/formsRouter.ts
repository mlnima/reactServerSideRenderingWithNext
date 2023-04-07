import {Router} from 'express';
// import adminAuthMiddleware from '../../../middlewares/adminAuthMiddleware';
import adminAuthMiddleware from 'custom-server-util/src/middleware-utils/adminAuthMiddleware';
import getForms from './getForms';
import getFrom from './getFrom';
import deleteForm from './deleteForm';

const router = Router();

router.get('/getForms',adminAuthMiddleware,getForms);
router.get('/getForm',adminAuthMiddleware,getFrom);
router.delete('/deleteForm',adminAuthMiddleware,deleteForm);

export default router