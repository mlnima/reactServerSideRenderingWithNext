import {Router} from 'express';
import cacheSuccesses from '../../middlewares/apiCache';
import clientGetMultipleSettings from './clientSettingsControllers/clientGetMultipleSettings';

const router = Router();

router.get('/getMultipleSettings', cacheSuccesses, clientGetMultipleSettings)

export default router