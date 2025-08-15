// @ts-nocheck
import postSchema from '../schemas/postSchema';
import { IPost } from '@repo/typescript-types';
import updateSaveMetas from 'api-server/dist/util/_updateSaveMetas';
import { updateCreateMultipleMetaByNameNType } from './meta';
import path from 'node:path';

const duplicatePostFinderQueryGenerator = (postData: IPost) => {
  try {
    if (postData.postType === 'video') {
      const fieldToCheck = ['title', 'videoEmbedCode', 'mainThumbnail', 'duration'].filter((field) => postData[field]);
      console.log(`fieldToCheck=> `, fieldToCheck);
      return {
        $and: [
          { duration: postData.duration },
          {
            $or: [{ title: postData.title }, { videoEmbedCode: postData.videoEmbedCode }, { mainThumbnail: postData.mainThumbnail }],
          },
        ],
      };
    } else {
      return {
        $or: [{ title: postData.title }, { mainThumbnail: postData.mainThumbnail }],
      };
    }
  } catch (error) {
    return null;
  }
};

interface IArgCreateNewPostViaAPI {
  newPost: IPost;
}

export const createNewPostViaAPI = async ({ newPost }: IArgCreateNewPostViaAPI) => {
  try {
    const duplicateFinderQuery = duplicatePostFinderQueryGenerator(newPost);
    console.log(`duplicateFinderQuery=> `, duplicateFinderQuery);
    const hasDuplicate = await postSchema.exists(duplicateFinderQuery);
    if (hasDuplicate) {
      console.log(`hasDuplicate=> `, hasDuplicate);
      return {
        success: false,
        message: 'Duplicate',
        statusCode: 409,
      };
    }
    const documentToSave = new postSchema({
      ...newPost,
      tags: newPost.tags ? await updateCreateMultipleMetaByNameNType(newPost.tags) : [],
      categories: newPost.categories ? await updateCreateMultipleMetaByNameNType(newPost.categories) : [],
      actors: newPost.actors ? await updateCreateMultipleMetaByNameNType(newPost.actors) : [],
      // mainThumbnail: downloadImageContent ? await FileManagerController.downloadCreatedPostByApiThumbnail(newPost) : newPost.mainThumbnail
      mainThumbnail: newPost.mainThumbnail,
    });

    const savedDocument = await documentToSave.save();

    return {
      success: true,
      message: `${savedDocument.title} Has Been Saved : ${savedDocument._id} `,
      data: {
        post: savedDocument,
      },
      statusCode: 200,
    };
  } catch (error) {
    console.log(`createNewPostViaAPI error=> `, error);
    return {
      success: false,
      message: 'Something Went Wrong',
      error,
      statusCode: 500,
    };
  }
};
