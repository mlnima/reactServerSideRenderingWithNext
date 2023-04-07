import {Router} from 'express';
import getPage from './pagesControllers/getPage';
import clientGetPagesData from './pagesControllers/clientGetPagesData';
import cacheSuccesses from '../../middlewares/apiCache';

const router = Router();

router.get('/getPage', cacheSuccesses, getPage)
router.get('/getPagesData', cacheSuccesses, clientGetPagesData)

export default router