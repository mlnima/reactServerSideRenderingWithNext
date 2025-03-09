// import { Document, Types, ObjectId } from 'mongoose';
import jwt from 'jsonwebtoken';
import { IPost } from '@repo/typescript-types';


export const generateJwtToken = (tokenData: object): string | undefined => {
  if (!process.env.JWT_KEY) return;
  return jwt.sign(tokenData, process.env.JWT_KEY || 'defaultKey', {
    expiresIn: '365 days',
  });
};

export const convertPostDocumentToObject =  (post: IPost) => {
  try {
    if (!post) return post;

    post._id = post._id?.toString();

    if (post.author) {
      post.author._id = post.author._id?.toString();
      if (post.author.profileImage) {
        post.author.profileImage._id = post.author.profileImage._id?.toString();
      }
    }

    if (post.tags) {
      for (const tag of post.tags) {
        tag._id = tag._id?.toString();
      }
    }

    if (post.categories) {
      for (const category of post.categories) {
        category._id = category._id?.toString();
      }
    }

    if (post.actors) {
      for (const actor of post.actors) {
        actor._id = actor._id?.toString();
      }
    }

    return post;
  } catch (error) {
    console.error("Error converting ObjectId to string:", error);
    return post;
  }
};



// export const convertPostDocumentToObject = (post: Post) => {
//   try {
//     if (post?._id) {
//       post._id = post._id.toString();
//     }
//
//     if (post?.author?._id) {
//       post.author._id = post.author._id.toString();
//     }
//
//     if (post?.author?.profileImage?._id) {
//       post.author.profileImage._id = post.author.profileImage._id.toString();
//     }
//
//     if (post?.tags){
//       for (const tag of post.tags){
//         tag._id = tag._id.toString()
//       }
//     }
//     if (post?.categories){
//       for (const category of post.categories){
//         category._id = category._id.toString()
//       }
//     }
//     if (post.actors){
//       for (const actor of post.actors){
//         actor._id = actor._id.toString()
//       }
//     }
//
//
//   } catch (error) {
//     return post
//   }
// };
