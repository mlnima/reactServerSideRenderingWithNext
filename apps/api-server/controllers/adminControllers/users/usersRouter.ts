import {Router} from 'express';
import adminAuthMiddleware from '@util/middlewares/adminAuthMiddleware';
import updateUser from './UpdateUser';
import adminNewApiKey from './adminNewApiKey';
import getUsers from './getUsers';
import adminDeleteUser from './adminDeleteUser';
import adminGetUser from './adminGetUser';


const router = Router();

router.post('/newAPIKey',adminAuthMiddleware,adminNewApiKey);
router.get('/getUsers',adminAuthMiddleware,getUsers);
router.delete('/deleteUser',adminAuthMiddleware,adminDeleteUser);
router.get('/getUser',adminAuthMiddleware,adminGetUser);
router.post('/updateUser',adminAuthMiddleware,updateUser);

export default router;