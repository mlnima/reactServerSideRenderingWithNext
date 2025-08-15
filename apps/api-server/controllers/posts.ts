import { Request, Response } from 'express';
import { createNewPostViaAPI, metaSchema, postSchema, savePostMedia } from '@repo/db';

export const createPost = async (req: Request, res: Response) => {
  /*
   at first we save the post then check if there is files attached and upload them and update the created post document
   */

  try {
    const newPost = typeof req.body.postData === 'string' ? JSON.parse(req.body.postData) : req.body.postData;
    const files = req.files as object;

    if (!newPost || !newPost?.title) {
      return res.status(400).json({
        error: 'Post data missing',
      });
    }

    const { success, message, data, statusCode } = await createNewPostViaAPI({ newPost });

    if (!success || !data?.post?._id) {
      return res.status(statusCode).json(message);
    }

    if (req.files) {
      const savedFiles = await savePostMedia({ files, postId: data?.post?._id });
      console.log(`savedFiles=> `, savedFiles);
    }
    
    return res.json({ message: `${newPost?.title} saved` });
  } catch (error) {
    console.log(`createPost error=> `, error);
    return res.status(500).json({ message: 'Something Went Wrong' });
  }
};
