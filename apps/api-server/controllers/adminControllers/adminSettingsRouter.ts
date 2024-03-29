import {Router} from 'express';
import {adminAuthMiddleware} from 'custom-server-util';
import adminUpdateSettings from './adminSettingsControllers/adminUpdateSettings';
import adminGetSettings from './adminSettingsControllers/adminGetSettings';
import adminGetMultipleSettings from './adminSettingsControllers/adminGetMultipleSettings';
// import adminClearCaches from './adminSettingsControllers/adminClearCaches';

const router = Router();

router.post('/update',adminAuthMiddleware,adminUpdateSettings)
router.get('/getSetting',adminAuthMiddleware,adminGetSettings)
router.get('/getMultipleSetting',adminAuthMiddleware,adminGetMultipleSettings)
//router.post('/clearCaches',adminAuthMiddleware,adminClearCaches)

export default router;