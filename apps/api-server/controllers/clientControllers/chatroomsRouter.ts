import {Router} from 'express';
import getChatroom from "./chatroomsControllers/getChatroom";

const router = Router();

router.get('/getChatroom',getChatroom);

export default router