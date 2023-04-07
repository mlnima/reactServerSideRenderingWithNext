import {Router} from 'express';
import saveFormData from './formsControllers/saveFormData';

const router = Router();

router.post('/saveFormData', saveFormData);

export default router;