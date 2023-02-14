import {Router} from 'express';
import getChatrooms from "./chatroomsControllers/getChatrooms";
import getChatroom from "./chatroomsControllers/getChatroom";
import deleteChatroom from "./chatroomsControllers/deleteChatroom";
import adminAuthMiddleware from "../../middlewares/adminAuthMiddleware";
import updateChatroom from "./chatroomsControllers/updateChatroom";
import deleteChatroomMessage from "./chatroomsControllers/deleteChatroomMessage";
import createChatroom from "./chatroomsControllers/createChatroom";

const router = Router();

router.get('/getChatrooms',adminAuthMiddleware,getChatrooms);
router.get('/getChatroom',adminAuthMiddleware,getChatroom);
router.post('/createChatroom',adminAuthMiddleware,createChatroom);
router.delete('/deleteChatroom',adminAuthMiddleware,deleteChatroom);
router.patch('/updateChatroom',adminAuthMiddleware,updateChatroom);
router.delete('/deleteChatroomMessage',adminAuthMiddleware,deleteChatroomMessage);

export default router