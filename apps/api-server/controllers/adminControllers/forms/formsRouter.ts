import {Router} from 'express';
import {adminAuthMiddleware} from 'custom-server-util';
import getForms from './getForms';
import getFrom from './getFrom';
import deleteForm from './deleteForm';

const router = Router();

router.get('/getForms',adminAuthMiddleware,getForms);
router.get('/getForm',adminAuthMiddleware,getFrom);
router.delete('/deleteForm',adminAuthMiddleware,deleteForm);

export default router