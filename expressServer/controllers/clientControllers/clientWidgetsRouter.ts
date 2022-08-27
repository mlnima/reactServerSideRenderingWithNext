import {Router} from 'express';
import cacheSuccesses from '../../middlewares/apiCache';
import clientGetMultipleWidgetWithData from './clientWidgetsControllers/clientGetMultipleWidgetWithData';
import clientGetWidget from './clientWidgetsControllers/clientGetWidget';

const router = Router();

router.get('/getMultipleWidgetWithData', cacheSuccesses, clientGetMultipleWidgetWithData)
router.post('/getMultipleWidgetWithData', (req, res) => {
    res.status(404).json({message: 'Route Has Been changed'})
})
router.post('/getWidget', cacheSuccesses, clientGetWidget)
// router.post('/clientSelfWidgetUpdate',clientSelfWidgetUpdate)

export default router