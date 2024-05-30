//fileManagerMainRouter
import {Router} from 'express';
import uploadRouter from './uploadFilesControllers/uploadRouter';
import serveFileRouter from "./serveFileControllers/serveFileRouter";

const router = Router();

router.use('/upload', uploadRouter);
// router.get('/dserve/:filename', serveFileRouter);


export default router;