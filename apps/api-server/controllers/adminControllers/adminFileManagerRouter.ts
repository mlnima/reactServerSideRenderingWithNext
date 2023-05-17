import {Router} from 'express';
import {adminAuthMiddleware} from 'custom-server-util';
import adminReadPath from './adminFileManagerControllers/adminReadPath';
import adminReadFile from './adminFileManagerControllers/adminReadFile';
import adminDeleteFile from './adminFileManagerControllers/adminDeleteFile';
import adminUploadFile from './adminFileManagerControllers/adminUploadFile';
import adminUploadFiles from './adminFileManagerControllers/adminUploadFiles';
import adminPostThumbnailsUpload from './adminFileManagerControllers/adminPostThumbnailsUpload';
import adminCreateNewFileOrFolder from './adminFileManagerControllers/adminCreateNewFileOrFolder';
import adminUpdateTranslationsFile from './adminFileManagerControllers/adminUpdateTranslationsFile';
import adminReadTranslationsFile from './adminFileManagerControllers/adminReadTranslationsFile';

const router = Router();

router.post('/readPath',adminAuthMiddleware,adminReadPath)
router.post('/readFile',adminAuthMiddleware,adminReadFile)
router.post('/deleteFile',adminAuthMiddleware,adminDeleteFile)
router.post('/uploadFile',adminAuthMiddleware,adminUploadFile)
router.post('/uploadFiles',adminAuthMiddleware,adminUploadFiles)
router.post('/postThumbnailsUpload',adminAuthMiddleware,adminPostThumbnailsUpload)
router.post('/create',adminAuthMiddleware,adminCreateNewFileOrFolder)
router.post('/updateTranslationsFile',adminAuthMiddleware,adminUpdateTranslationsFile)
router.post('/readTranslationsFile',adminAuthMiddleware,adminReadTranslationsFile)

export default router;
