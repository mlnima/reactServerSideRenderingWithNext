// @ts-nocheck
import { Request, Response } from 'express';
import fsExtra from 'fs-extra';
import sharp from 'sharp';


import fs from 'fs';
import download from 'image-downloader';
import path from 'path';
import fileRemover from '@_variables/fileRemover';
import { getCurrentDatePath } from '@util/path-utils';
import { fileSchema, postSchema, userSchema } from '@repo/db';

import { isValidObjectId } from 'mongoose';

class FileManagerController {
  static dev = process.env.NODE_ENV !== 'production';
  static publicFolderPath = path.join(__dirname);

  //---------------------helpers--------------------
  static async profileImageTypeHandler(userId: string, profileImageId: string) {
    try {
      const user = await userSchema.findById(userId).exec();
      await userSchema.findByIdAndUpdate(userId, { $set: { profileImage: profileImageId } }).exec();
      await fileRemover(user?.profileImage);
    } catch (error) {
      console.log(error);
    }
  }

  static async deletePreviousProfileImage(userId: string) {
    try {
      const userData = await userSchema.findById(userId).select('profileImage').exec();
      if (isValidObjectId(userData?.profileImage)) {
        try {
          const profileImageDocument = await fileSchema.findById(userData?.profileImage).exec();
          if (!profileImageDocument?.filePath.includes('http')) {
            await fsExtra.unlink(path.join(__dirname, '../../../../', profileImageDocument.filePath));
            await fileSchema.findByIdAndDelete(userData?.profileImage).exec();
          }
        } catch (error) {
          console.log('error=> ', error);
        }
        //@ts-ignore
      } else if (!!userData?.profileImage && !isValidObjectId(userData?.profileImage) && !userData?.profileImage?.includes('http')) {
        try {
          //@ts-ignore
          await fsExtra.unlink(path.join(__dirname, '../../../../', userData?.profileImage));
        } catch (error) {
          console.log('error=> ', error);
          return;
        }
      }

      if (!!userData?.profileImage) {
        await userSchema.findByIdAndUpdate(userId, { $unset: { profileImage: 1 } }).exec();
      }

      return;
    } catch (error) {
      console.log('error=> ', error);
      return;
    }
  }

  static async deleteFile(filePath: string) {
    try {
      const pathToUploadFolder = path.join(__dirname, '../', filePath);
      await fsExtra.unlink(pathToUploadFolder);
      console.log('File deleted successfully', filePath);
    } catch (err) {
      console.error(`Error deleting file: ${err}`);
      throw err;
    }
  }

  //---------------------client--------------------

  // static async userProfileImageUpload(req: Request, res: Response) {
  //     const file = req.files.profileImage;
  //     const userId = req.userData._id;
  //     const directoryPath = './public/uploads/users/' + userId + '/';
  //     const filePath = directoryPath + file.name + '.png';
  //     const filePathOriginalSize = directoryPath + 'originalSize_' + file.name;
  //     fsExtra
  //         .ensureDir(directoryPath)
  //         .then(() => {
  //             file.mv(filePathOriginalSize, function (err) {
  //                 if (err) {
  //                     console.log(err);
  //                     res.json({ response: 'something is wrong', type: 'error', error: err });
  //                 } else {
  //                     sharp(filePathOriginalSize)
  //                         .resize(180, 180)
  //                         .toFile(filePath, (err, info) => {
  //                             if (err) {
  //                                 console.log(err);
  //                                 res.status(500);
  //                             } else {
  //                                 const imageUrl =
  //                                     process.env.NEXT_PUBLIC_PRODUCTION_URL +
  //                                     filePath.replace('.', '');
  //
  //                                 userSchema
  //                                     .findByIdAndUpdate(req.userData._id, {
  //                                         profileImage: imageUrl,
  //                                     })
  //                                     .exec()
  //                                     .then(() => {
  //                                         fsExtra.remove(filePathOriginalSize);
  //                                         res.json({ response: 'Uploaded', path: imageUrl });
  //                                     })
  //                                     .catch(() => {
  //                                         res.status(500);
  //                                     });
  //                             }
  //                         });
  //                 }
  //             });
  //         })
  //         .catch(err => {
  //             console.log(err);
  //             res.end();
  //         });
  // }

  static async downloadCreatedPostByApiThumbnail(newPost: any) {
    const formats = ['.jpeg', '.jpg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.webp'];
    const imageformat = formats.find(format => newPost?.mainThumbnail?.includes(format));
    const today = new Date(Date.now());
    const directoryPath = `./public/uploads/image/${today.getFullYear()}/${today.getMonth() + 1}/`;
    !fs.existsSync(directoryPath) ? fs.mkdirSync(directoryPath, { recursive: true }) : null;
    const fileName = `${newPost.title.replace(/[^a-zA-Z ]/g, '')}${Date.now()}`;
    const filePathOriginalSize = `${directoryPath}originalSize_${fileName + imageformat}`;
    const filePath = `${directoryPath}${fileName + imageformat}`;
    const options = {
      url: newPost.mainThumbnail,
      dest: filePathOriginalSize,
    };

    try {
      return await download
        .image(options)
        .then(async ({ filename }) => {
          try {
            return await sharp(filePathOriginalSize)
              .resize(320, 180)
              .toFile(filePath)
              .then(async () => {
                try {
                  await fsExtra.remove(filePathOriginalSize);
                  return filePath.replace('./public/', '/public/');
                } catch (err) {
                  console.log(err);
                  return newPost.mainThumbnail;
                }
              })
              .catch(err => {
                return newPost.mainThumbnail;
              });
          } catch (err) {
            console.log(err);
            return newPost.mainThumbnail;
          }
        })
        .catch(err => {
          console.log(err);
          return newPost.mainThumbnail;
        });
    } catch (err) {
      console.log(err);
      return newPost.mainThumbnail;
    }
  }

  static async uploadPostImages(req: Request, res: Response) {
    try {
      // Validate request data
      if (!req.body?.imagesData || !req.files?.images || !req.body?.imagesData?.includes('postId')) {
        return res.status(400).json({ error: 'Bad request. Missing imagesData or images.' });
      }

      const parsedImagesData = JSON.parse(req.body.imagesData);
      const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      const directoryPath = `./public/uploads/images/${getCurrentDatePath()}`;

      // Ensure directory exists
      await fsExtra.ensureDir(directoryPath);

      let responseImages = [];

      for await (const image of images) {
        try {
          // Create an empty file document
          const emptyFileDocument = new fileSchema({
            usageType: parsedImagesData.usageType, // Use parsedImagesData instead of imagesData
            filePath: 'temp',
            mimeType: image.mimetype,
          });

          const savedEmptyDoc = await emptyFileDocument.save();
          const filePath = `/public/uploads/images/${getCurrentDatePath()}/${savedEmptyDoc._id}.webp`;
          await image.mv('.' + filePath);
          const updatedImageDoc = await fileSchema.findByIdAndUpdate(savedEmptyDoc._id, { filePath }, { new: true }).exec();
          await postSchema.findByIdAndUpdate(parsedImagesData.postId, { $push: { images: updatedImageDoc._id } }).exec();
          responseImages.push(updatedImageDoc);
        } catch (error) {
          console.error('Error saving image:', error);
          return res.status(500).json({ message: 'Something Went Wrong' });
        }
      }

      // Update post with mainThumbnail
      const postImages = await postSchema
        .findById(parsedImagesData.postId)
        .select('images')
        .populate([{ path: 'images', select: { filePath: 1 }, model: 'file' }])
        .exec();

      if (postImages?.images?.[0]?.filePath) {
        await postSchema.findByIdAndUpdate(parsedImagesData.postId, { mainThumbnail: postImages.images[0].filePath }).exec();
      }

      return res.status(200).json({ images: responseImages });
    } catch (error) {
      console.error('Upload Post Images:', error);
      return res.status(500).json({ message: 'Something Went Wrong' });
    }
  }

  static async uploadProfileImage(req: Request, res: Response) {
    try {
      const userData = req.userData;
      await FileManagerController.deletePreviousProfileImage(userData._id);
      const imagesData = JSON.parse(req.body?.imagesData || '{}');
      const images = Array.isArray(req.files?.images) ? req.files?.images : [req.files?.images];
      const image = images[0];
      const directoryPath = `./public/uploads/images/${getCurrentDatePath()}`;
      await fsExtra.ensureDir(directoryPath);

      try {
        // creating a empty file document
        const emptyFileDocument = new fileSchema({
          usageType: imagesData.usageType,
          filePath: 'temp',
          mimeType: image.mimetype,
        });

        const savedEmptyDoc = await emptyFileDocument.save();
        const filePath = `/public/uploads/images/${getCurrentDatePath()}/${savedEmptyDoc?._id}.webp`;
        await image.mv('.' + filePath);
        const updatedImageDoc = await fileSchema.findByIdAndUpdate(savedEmptyDoc?._id, { filePath }, { new: true }).exec();
        await userSchema.findByIdAndUpdate(userData._id, { profileImage: updatedImageDoc?._id }, { new: true }).exec();
        res.status(200).json({ newProfileImage: filePath });
        return;
      } catch (error) {
        console.log('saving images', error);
        return res.status(500).json({ message: 'Something Went Wrong' });

      }
    } catch (error) {
      console.log('Upload Post Images:', error);
      return res.status(500).json({ message: 'Something Went Wrong' });

    }
  }

  // static async deletePostImage(req: Request, res: Response) {
  //     try {
  //         const { postId } = req.query;
  //
  //         if (!postId) {
  //             res.status(400).json({
  //                 message: 'No postId provided',
  //             });
  //             return;
  //         }
  //
  //         const postDocument = await postSchema.findById(postId).lean().exec();
  //
  //         const imageDocument = await fileSchema.findById(postDocument.thumbnail).lean().exec();
  //
  //         if (req.userData?._id?.toString() !== postDocument?.author?.toString()) {
  //             res.status(401).json({
  //                 message: 'Unauthorized',
  //             });
  //             return;
  //         }
  //
  //         if (!imageDocument || !postDocument) {
  //             res.status(404).json({
  //                 message: 'Post or image not found',
  //             });
  //             return;
  //         }
  //
  //         if (imageDocument.filePath && imageDocument.filePath.startsWith('/public/')) {
  //             await fsExtra.unlink(path.join(process.cwd(), imageDocument.filePath), () => null);
  //
  //             await postSchema.findByIdAndUpdate(postId, { $unset: { mainThumbnail: '' } }).exec();
  //
  //             await fileSchema.findByIdAndDelete(imageDocument._id).exec();
  //
  //             res.status(200).json({
  //                 message: 'Image deleted successfully',
  //             });
  //             return;
  //         } else {
  //             res.status(400).json({
  //                 message: 'Invalid filePath: Must start with /public/',
  //             });
  //             return;
  //         }
  //     } catch (error) {
  //         console.log('deletePostImage error=> ', error);
  //         res.status(500).json({
  //             message: 'Internal Server Error',
  //         });
  //         return;
  //     }
  // }

  // static async deletePostImages(req: Request, res: Response) {
  //     try {
  //         const postId = req.query._id;
  //         const postDocument = postId
  //             ? await postSchema
  //                   .findById(postId)
  //                   .select('images author')
  //                   .populate([
  //                       {
  //                           path: 'images',
  //                           select: { filePath: 1 },
  //                           model: 'file',
  //                       },
  //                   ])
  //                   .lean()
  //                   .exec()
  //             : null;
  //
  //         const authorId = postDocument?.author.toString();
  //         const userId = req.userData?._id;
  //         console.log(`match=> ${authorId} ${userId} `);
  //         if (userId !== authorId) {
  //             res.status(401).json({
  //                 message: 'Unauthorized',
  //             });
  //             return;
  //         }
  //
  //         if (!postDocument) {
  //             res.status(404).json({
  //                 message: 'Post or image not found',
  //             });
  //             return;
  //         }
  //
  //         if (postDocument?.images?.length > 0) {
  //             for await (const imageDocument of postDocument?.images) {
  //                 if (imageDocument.filePath && imageDocument.filePath.startsWith('/public/')) {
  //                     try {
  //                         await FileManagerController.deleteFile(imageDocument.filePath);
  //                         await fileSchema.findByIdAndDelete(imageDocument?._id).exec();
  //                         console.log(imageDocument?._id, 'image deleted successfully');
  //                     } catch (error) {
  //                         console.log('error=> ', error);
  //                     }
  //                 }
  //             }
  //         }
  //
  //         res.status(200).json({
  //             message: 'Image deleted successfully',
  //         });
  //     } catch (error) {
  //         console.log('deletePostImage error=> ', error);
  //         res.status(500).json({
  //             message: 'Internal Server Error',
  //         });
  //     }
  // }

  //---------------------Dashboard--------------------

  static async dashboardReadPath(req: Request, res: Response) {
    const path = req.body.path;
    fs.readdir(path, (err, data) => {
      if (err) {
        if (err.code === 'ENOTDIR') {
          fs.readFile(path, (err, fileData) => {
            if (err) {
              res.json({ error: true, data: [], type: undefined });
            } else {
              res.json({ error: true, data: fileData.toString('utf8'), type: 'file' });
            }
          });
        } else {
          res.json({ error: true, data: [], type: undefined });
        }
      } else {
        res.json({ error: false, data, type: 'dir' });
      }
    });
  }

  static async dashboardDeleteFile(req: Request, res: Response) {
    const filePath = req.body.filePath;
    fs.unlink(filePath, err => {
      if (err) {
        res.json({ error: true, data: 'something happened', type: undefined });
      } else {
        res.json({ error: false, data: 'deleted' });
      }
    });
  }

  static async dashboardUploadFile(req: Request, res: Response) {
    const file = req?.files?.uploadingFile;
    const fileType = file.mimetype.split('/')[0];
    const desiredMode = 0o2775;
    const options = {
      mode: 0o2775,
    };
    const today = new Date(Date.now());
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const directoryPath = './public/uploads/' + fileType + '/' + year + '/' + month + '/';
    fsExtra
      .ensureDir(directoryPath)
      .then(async () => {
        try {
          const filePath = directoryPath + file.name;
          const fileExist = fs.existsSync(filePath);
          if (fileExist) {
            await fs.unlinkSync(filePath);
          }

          file.mv(filePath, function(err) {
            if (err) {
              res.json({ response: 'something is wrong', type: 'error', error: err });
            } else {
              res.json({ response: 'Uploaded', path: filePath });
            }
          });
        } catch (err) {
          console.log(err);
        }
      })
      .catch(err => {
        console.log(err);
        res.end();
      });
  }

  static async dashboardUpdateTranslationsFile(req: Request, res: Response) {
    try {
      const filePath = req.body.path.replace('./', '/');
      const targetPath = path.join(__dirname, `../../../../web-app${filePath}`);
      const data = req.body.data;

      fs.writeFile(targetPath, data, err => {
        if (err) {
        } else {
          res.json({ message: 'file updated' });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async dashboardGetTranslationsFile(req: Request, res: Response) {
    const filePath = req.query.path.replace('./', '/');
    const targetPath = path.join(__dirname, `../../../../web-app${filePath}`);

    try {
      fs.readFile(targetPath, (error, fileData) => {
        if (error) {
          console.log(error);
          res.json({ error: true, data: '', type: undefined });
        } else {
          res.json({ error: false, data: fileData.toString('utf8'), type: 'file' });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default FileManagerController;

// static async dashboardCreateNewFileOrFolder(req: Request, res: Response){
//     const Path = req.body.Path === '.' ? './' : req.body.Path;
//     const fileFolderName = req.body.fileFolderName;
//     const type = req.body.type;
//
//     if (type === 'file') {
//         fs.writeFile(Path + '/' + fileFolderName, '', (err) => {
//             if (err) {
//                 console.log(err)
//
//             } else {
//
//             }
//         });
//     } else {
//         fs.mkdirSync(Path + '/' + fileFolderName)
//
//     }
//     res.end()
//
// }

// static async dashboardPostThumbnailsUpload(req: Request, res: Response){
//     const file = req.files?.uploadingFile
//     const fileType = file.mimetype.split('/')[0]
//     const today = new Date(Date.now())
//     const year = today.getFullYear()
//     const month = today.getMonth() + 1
//     const directoryPath = './static/uploads/' + fileType + '/' + year + '/' + month + '/';
//     fsExtra.ensureDir(directoryPath).then(() => {
//         const filePath = directoryPath + file.name
//         const filePathOriginalSize = directoryPath + 'originalSize_' + file.name
//
//         file.mv(filePathOriginalSize, function (err) {
//             if (err) {
//                 console.log(err)
//                 res.json({response: 'something is wrong', type: 'error', error: err})
//             } else {
//                 sharp(filePathOriginalSize).resize(320, 240).toFile(filePath, (err, info) => {
//                     if (err) {
//                         console.log(err)
//                         res.status(500);
//                     } else {
//                         fsExtra.remove(filePathOriginalSize)
//                         res.json({response: 'Uploaded', path: filePath})
//                     }
//
//                 })
//
//
//             }
//         });
//
//     }).catch(err => {
//         console.log(err)
//         res.end()
//     })
//
// }

// static async dashboardUploadFiles(req: Request, res: Response){
//     const file = req.files.uploadingFile;
//     const fileType = file.mimetype.split('/')[0];
//     const today = new Date(Date.now());
//     const year = today.getFullYear();
//     const month = today.getMonth() + 1;
//     const directoryPath = './public/uploads/' + fileType + '/' + year + '/' + month + '/';
//
//     fsExtra.ensureDir(directoryPath).then(() => {
//         const filePath = directoryPath + file.name;
//         const filePathOriginalSize = directoryPath + 'originalSize_' + file.name;
//
//         if (fileType === 'image') {
//             file.mv(filePathOriginalSize, function (err) {
//                 if (err) {
//                     console.log(err)
//                     res.json({response: 'something is wrong', type: 'error', error: err})
//                 } else {
//                     let imageHeight = req.body.type === 'thumbnail' ? 180 :
//                         req.body.type === 'gallery' ? 720 : 720;
//
//                     let imageWidth = req.body.type === 'thumbnail' ? 320 :
//                         req.body.type === 'gallery' ? 1280 : 1280;
//
//                     sharp(filePathOriginalSize).resize(imageWidth, imageHeight).toFile(filePath, (err, info) => {
//                         if (err) {
//                             console.log(err)
//                             res.status(500);
//                         } else {
//                             fsExtra.remove(filePathOriginalSize)
//                             res.json({response: 'Uploaded', path: filePath})
//                         }
//                     })
//                 }
//             });
//         } else {
//             file.mv(filePath, function (err) {
//                 if (err) {
//                     console.log(err)
//                     res.json({response: 'something is wrong', type: 'error', error: err})
//                 } else {
//
//                     res.json({response: 'Uploaded', path: filePath})
//                 }
//             });
//         }
//
//
//     }).catch(err => {
//         console.log(err)
//         res.end()
//     })
// }

// static async dashboardReadFile(req: Request, res: Response){
//     const path = req.body.path;
//     fs.readFile(path, (err, fileData) => {
//         if (err) {
//             res.json({error: true, data: [], type: undefined});
//         } else {
//             res.json({error: false, data: fileData.toString('utf8'), type: 'file'});
//         }
//     })
// }

// static async uploadImage(req: Request, res: Response){
//     try {
//
//         const imagesData = JSON.parse(req.body.imagesData || '{}')
//         const images = Array.isArray(req.files?.images) ? req.files?.images : [req.files?.images]
//         const directoryPath = `./public/uploads/images/${getCurrentDatePath()}`;
//         await fsExtra.ensureDir(directoryPath);
//         let responseImages = []
//
//         const imagePromises = images.map(async (image:any) => {
//             const fileName = await removeFileExtension(image.name)
//             const tempPath = `${directoryPath}/temp-${fileName}`;
//             const targetPath = `${directoryPath}/${fileName}.webp`
//
//             await image.mv(tempPath)
//             sharp.cache({files: 0})
//
//             const imageDataToSave = new fileSchema({
//                 usageType: imagesData.usageType,
//                 filePath: `/public/uploads/images/${getCurrentDatePath()}/${fileName}.webp`,
//                 mimeType: image.mimetype,
//             })
//
//
//             // const fitImage = imagesData.usageType === 'post' ? sharp.fit.contain :
//             //     imagesData.usageType === 'profileImage' ? sharp.fit.cover : sharp.fit.cover
//             //
//
//             return sharp(tempPath).webp({nearLossless: true, quality: 50})
//                 //@ts-ignore
//                 .resize({
//                     width: imagesData?.width || 640,
//                     height: imagesData?.height || 480,
//                     fit: imagesData.usageType === 'post' ? sharp.fit.contain : sharp.fit.cover})
//                 .toFile(targetPath)
//                 .then(async () => {
//                     if (fs.existsSync(tempPath)) {
//                         try {
//                             fs.unlinkSync(tempPath)
//                         } catch (_) {
//                         }
//                     }
//
//                     await imageDataToSave.save()
//                     responseImages = [...responseImages, imageDataToSave]
//                 })
//         })
//
//         await Promise.all(imagePromises)
//
//         if (imagesData.usageType === 'profileImage' && req.userData?._id && responseImages?.[0]?._id) {
//             await FileManagerController.profileImageTypeHandler(req.userData._id, responseImages?.[0]?._id)
//         }
//
//         res.status(200).json({images: responseImages})
//     } catch (error) {
//         console.log('upload image error:', error)
//         res.status(500).json({error})
//     }
// }
