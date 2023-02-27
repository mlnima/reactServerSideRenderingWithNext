import {Router} from 'express';
import cacheSuccesses from '../../middlewares/apiCache';
import getWidgets from './clientWidgetsControllers/getWidgets';
import clientGetWidget from './clientWidgetsControllers/clientGetWidget';

const router = Router();

router.get('/getWidgets', cacheSuccesses, getWidgets)

router.post('/getWidget', cacheSuccesses, clientGetWidget)
// router.post('/clientSelfWidgetUpdate',clientSelfWidgetUpdate)

export default router