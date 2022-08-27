import {Router} from 'express';
import adminAuthMiddleware from '../../middlewares/adminAuthMiddleware';
import adminUpdateUserData from './adminUsersControllers/adminUpdateUserData';
import adminNewApiKey from './adminUsersControllers/adminNewApiKey';
import adminGetUsersList from './adminUsersControllers/adminGetUsersList';
import adminDeleteUser from './adminUsersControllers/adminDeleteUser';
import adminGetUser from './adminUsersControllers/adminGetUser';

const router = Router();

router.post('/newAPIKey',adminAuthMiddleware,adminNewApiKey);
router.post('/getUsersList',adminAuthMiddleware,adminGetUsersList);
router.post('/deleteUser',adminAuthMiddleware,adminDeleteUser);
router.post('/getUser',adminAuthMiddleware,adminGetUser);
router.post('/adminUpdateUserData',adminAuthMiddleware,adminUpdateUserData);

export default router;