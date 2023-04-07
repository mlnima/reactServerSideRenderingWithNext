import {Router} from 'express';
import cacheSuccesses from '../../middlewares/apiCache';
import getWidgets from './widgetsControllers/getWidgets';

const router = Router();

router.get('/getWidgets', cacheSuccesses, getWidgets)
export default router