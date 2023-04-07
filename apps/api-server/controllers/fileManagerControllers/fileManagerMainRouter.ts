//fileManagerMainRouter
import {Router} from 'express';
import uploadRouter from './uploadFilesControllers/uploadRouter';

const router = Router();

router.use('/upload', uploadRouter);


export default router;