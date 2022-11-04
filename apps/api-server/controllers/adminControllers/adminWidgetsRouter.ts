import {Router} from 'express';
import adminAuthMiddleware from '../../middlewares/adminAuthMiddleware';
import adminAddNewWidget from './adminWidgetsControllers/adminAddNewWidget';
import {adminUpdateWidget} from './adminWidgetsControllers/adminUpdateWidget';
import adminDeleteWidget from './adminWidgetsControllers/adminDeleteWidget';
import adminGetWidgets from './adminWidgetsControllers/adminGetWidgets';
import adminPanelGetWidgets from './adminWidgetsControllers/adminPanelGetWidgets';

const router = Router();

router.post('/adminAddNewWidget',adminAuthMiddleware,adminAddNewWidget)
router.post('/adminUpdateWidget',adminAuthMiddleware,adminUpdateWidget)
router.post('/adminDeleteWidget',adminAuthMiddleware,adminDeleteWidget)
router.get('/adminGetWidgets',adminAuthMiddleware,adminGetWidgets)
router.get('/adminPanelGetWidgets',adminAuthMiddleware,adminPanelGetWidgets)

export default router