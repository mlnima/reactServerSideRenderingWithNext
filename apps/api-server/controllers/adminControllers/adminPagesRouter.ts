import {Router} from 'express';
import adminAuthMiddleware from '../../middlewares/adminAuthMiddleware';
import adminCreateNewPage from './adminPagesControllers/adminCreateNewPage';
import adminUpdatePage from './adminPagesControllers/adminUpdatePage';
import adminGetPagesData from './adminPagesControllers/adminGetPagesData';
import adminDeleteCustomPage from './adminPagesControllers/adminDeleteCustomPage';
import adminGetPageData from './adminPagesControllers/adminGetPageData';

const router = Router();

router.post('/createNewPage',adminAuthMiddleware,adminCreateNewPage)
router.post('/updatePage',adminAuthMiddleware,adminUpdatePage)
router.post('/getPagesData',adminAuthMiddleware,adminGetPagesData)
router.post('/deleteCustomPage',adminAuthMiddleware,adminDeleteCustomPage)
router.post('/getPageData',adminAuthMiddleware,adminGetPageData)

export default router