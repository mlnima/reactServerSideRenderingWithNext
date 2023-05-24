import {Router} from 'express';
import {authMiddleware} from 'custom-server-util';
import updateUserData from './usersControllers/updateUserData';
import register from './usersControllers/register';
import userLogin from './usersControllers/userLogin';
import resetPassword from './usersControllers/resetPassword';
import getUsers from './usersControllers/getUsers';
import followUser from './usersControllers/followUser';
import unfollowUser from './usersControllers/unfollowUser';
import getUser from './usersControllers/getUser';
import getSignedInUserData from './usersControllers/getSignedInUserData';
import getStartConversation from './usersControllers/getStartConversation';

import getUserPageData from "./usersControllers/getUserPageData";


const router = Router();

router.post('/register', register);
router.post('/login', userLogin);
router.post('/getSignedInUserData', authMiddleware, getSignedInUserData);

router.post('/resetPassword', authMiddleware, resetPassword);

router.post('/updateUserData', authMiddleware, updateUserData);

router.get('/getUser', authMiddleware, getUser);
router.get('/getUsers', getUsers);
router.get('/getUserPageData', getUserPageData);

router.patch('/followUser', authMiddleware, followUser);
router.patch('/unFollowUser', authMiddleware, unfollowUser);


router.post('/getStartConversation', authMiddleware, getStartConversation);



export default router;


// import sendPrivateMessage from './usersControllers/sendPrivateMessage';
// import getConversations from './usersControllers/getConversations';
// import getConversation from './usersControllers/getConversation';
// import deleteConversation from './usersControllers/deleteConversation';
// import getPrivateMessages from "./usersControllers/getPrivateMessages";
// router.post('/sendPrivateMessage', authMiddleware, sendPrivateMessage);
// router.get('/getPrivateMessages', authMiddleware, getPrivateMessages);

//will be remove
// router.post('/getConversations', authMiddleware, getConversations);
// router.post('/getConversation', authMiddleware, getConversation);
// router.get('/deleteConversation', authMiddleware, deleteConversation);
