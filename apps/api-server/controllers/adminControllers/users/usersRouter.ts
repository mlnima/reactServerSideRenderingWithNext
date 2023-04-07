import {Router} from 'express';
// import adminAuthMiddleware from '../../../middlewares/adminAuthMiddleware';
import adminAuthMiddleware from 'custom-server-util/src/middleware-utils/adminAuthMiddleware';
import updateUser from './UpdateUser';
import adminNewApiKey from './adminNewApiKey';
import getUsers from './getUsers';
import adminDeleteUser from './adminDeleteUser';
import adminGetUser from './adminGetUser';


const router = Router();

router.post('/newAPIKey',adminAuthMiddleware,adminNewApiKey);
router.get('/getUsers',adminAuthMiddleware,getUsers);
router.post('/deleteUser',adminAuthMiddleware,adminDeleteUser);
router.post('/getUser',adminAuthMiddleware,adminGetUser);
router.post('/updateUser',adminAuthMiddleware,updateUser);

export default router;