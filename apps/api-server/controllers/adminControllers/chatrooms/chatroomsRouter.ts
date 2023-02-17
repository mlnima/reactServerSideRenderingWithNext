import {Router} from 'express';
import getChatrooms from "./getChatrooms";
import getChatroom from "./getChatroom";
import deleteChatroom from "./deleteChatroom";
import adminAuthMiddleware from "../../../middlewares/adminAuthMiddleware";
import updateChatroom from "./updateChatroom";
import deleteChatroomMessage from "./deleteChatroomMessage";
import createChatroom from "./createChatroom";

const router = Router();

router.get('/getChatrooms',adminAuthMiddleware,getChatrooms);
router.get('/getChatroom',adminAuthMiddleware,getChatroom);
router.post('/createChatroom',adminAuthMiddleware,createChatroom);
router.delete('/deleteChatroom',adminAuthMiddleware,deleteChatroom);
router.patch('/updateChatroom',adminAuthMiddleware,updateChatroom);
router.delete('/deleteChatroomMessage',adminAuthMiddleware,deleteChatroomMessage);

export default router