import {Router} from 'express';
import getConversationsList from "./messengerControllers/getConversationsList";
import authMiddleware from "@util/middlewares/authMiddleware";
import getAConversation from "./messengerControllers/getAConversation";
import loadOlderMessages from "./messengerControllers/loadOlderMessages";
import startAConversation from "./messengerControllers/startAConversation";

const router = Router();

router.get('/loadOlderMessages',authMiddleware,loadOlderMessages);
router.get('/getConversationsList',authMiddleware,getConversationsList);
router.get('/getAConversation',authMiddleware,getAConversation);
router.post('/startAConversation',authMiddleware,startAConversation);

export default router