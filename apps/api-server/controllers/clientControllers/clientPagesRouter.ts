import {Router} from 'express';
import clientGetPageData from './clientPagesControllers/clientGetPageData';
import clientGetPagesData from './clientPagesControllers/clientGetPagesData';
import cacheSuccesses from '../../middlewares/apiCache';

const router = Router();

router.get('/getPageData', cacheSuccesses, clientGetPageData)
router.get('/getPagesData', cacheSuccesses, clientGetPagesData)

export default router