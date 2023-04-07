import {Router} from 'express';
import cacheSuccesses from '../../middlewares/apiCache';
import getSettings from './settingsControllers/getSettings';

const router = Router();

router.get('/getSettings', cacheSuccesses, getSettings)

export default router