import {Router} from 'express';
import adminAuthMiddleware from '../../../middlewares/adminAuthMiddleware';
import createWidget from './createWidget';
import {updateWidget} from './updateWidget';
import adminDeleteWidget from './adminDeleteWidget';
import adminGetWidgets from './adminGetWidgets';
import getWidgets from './getWidgets';
import getPopulatedWidgets from './getPopulatedWidgets';


const router = Router();

router.post('/createWidget',adminAuthMiddleware,createWidget)
router.post('/updateWidget',adminAuthMiddleware,updateWidget)
router.post('/adminDeleteWidget',adminAuthMiddleware,adminDeleteWidget)
router.get('/adminGetWidgets',adminAuthMiddleware,adminGetWidgets)
router.get('/getWidgets',adminAuthMiddleware,getWidgets)
router.get('/getPopulatedWidgets',adminAuthMiddleware,getPopulatedWidgets)

export default router