import {Router} from 'express';
import clientSaveFormData from './clientFormsControllers/clientSaveFormData';

const router = Router();

router.post('/saveFormData', clientSaveFormData);

export default router;