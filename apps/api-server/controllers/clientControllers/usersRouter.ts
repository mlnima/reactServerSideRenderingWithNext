import {Router} from 'express';
import authMiddleware from 'custom-server-util/src/middleware-utils/authMiddleware';
import updateUserData from './uersControllers/updateUserData';
import register from './uersControllers/register';
import userLogin from './uersControllers/userLogin';
import resetPassword from './uersControllers/resetPassword';
import getUsers from './uersControllers/getUsers';
import followUser from './uersControllers/followUser';
import unfollowUser from './uersControllers/unfollowUser';
import getUser from './uersControllers/getUser';
import getSignedInUserData from './uersControllers/getSignedInUserData';

import getStartConversation from './uersControllers/getStartConversation';
import sendPrivateMessage from './uersControllers/sendPrivateMessage';
import getConversations from './uersControllers/getConversations';
import getConversation from './uersControllers/getConversation';
import deleteConversation from './uersControllers/deleteConversation';

const router = Router();

router.post('/register', register);
router.post('/login', userLogin);
router.post('/resetPassword', authMiddleware, resetPassword);
router.post('/getSignedInUserData', authMiddleware, getSignedInUserData);
router.get('/getUser', authMiddleware, getUser);
router.post('/updateUserData', authMiddleware, updateUserData);
router.get('/getUsers', getUsers);
router.post('/followUser', authMiddleware, followUser);
router.post('/unFollowUser', authMiddleware, unfollowUser);
router.post('/getStartConversation', authMiddleware, getStartConversation);
router.post('/getConversations', authMiddleware, getConversations);
router.post('/getConversation', authMiddleware, getConversation);
router.get('/deleteConversation', authMiddleware, deleteConversation);
router.post('/sendPrivateMessage', authMiddleware, sendPrivateMessage);

export default router;