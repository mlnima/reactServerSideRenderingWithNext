'use server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase, userSchema } from '@repo/db';
import { User } from '@repo/typescript-types';
import {Document} from "mongoose";

const tokenExpireTime = '365d';

interface ILogin {
  username: string;
  password: string;
}

interface IOLogin {
  token: string | null;
  userData: User | null;
  success: boolean;
  message: string;
}

interface IRegister {
  username: string;
  email: string;
  password: string
  password2: string
}

export const login = async ({
  username,
  password,
}: ILogin): Promise<IOLogin> => {

  const errorMessage = {
    token: null,
    userData: null,
    success: false,
    message: 'Wrong Username or password',
  };

  try {
    await connectToDatabase('login');

    if (!username || !password) {
      return errorMessage;
    }

    const user = await userSchema
      .findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } })
      .populate({
        path: 'profileImage',
        select: 'filePath',
        model: 'file',
        options: { strictPopulate: false },
      }).lean({
          virtuals: true,
          transform: (doc: Document) => {
            if (doc?._id) {
              doc._id = doc._id.toString();
            }
            // @ts-expect-error:it's fine
            if (doc?.profileImage?._id) {
              // @ts-expect-error:it's fine
              doc.profileImage._id = doc.profileImage._id.toString();
            }            // @ts-expect-error:it's fine
            if (doc?.draftPost) {
              // @ts-expect-error:it's fine
              doc.draftPost = doc.draftPost.toString();
            }
            return doc;
          },
        });

    if (!user) {
      return errorMessage;
    }
    // @ts-expect-error: check
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return errorMessage;
    }

    const token = jwt.sign(
      { username: user.username, _id: user._id },
      process.env.JWT_KEY || 'defaultKey',
      { expiresIn: tokenExpireTime }
    );

    const {
      username: userDataUsername,
      draftPost,
      role,
      keyMaster,
      profileImage,
      _id,
    } = user;


    const userData = {
      username: userDataUsername,
      draftPost,
      role,
      keyMaster,
      profileImage,
      _id,
    };

    return {
      token,
      userData,
      success: true,
      message: 'Login successful',
    };
  } catch (error) {
    console.error('Error during login:', error);
    return {
      token: null,
      userData: null,
      success: false,
      message: 'An error occurred during login',
    };
  }
};
// export const login = async ({username,password}:ILogin) : Promise<IOLogin> => {
//
//     try {
//         const errorMessage = {
//             token:null,
//             userData:null,
//             success: false,
//             message: 'Wrong Username or password',
//         }
//         if (!username || !password){
//             return {
//                 token:null,
//                 userData:null,
//                 success: false,
//                 message: 'Wrong Username or password',
//             }
//         }
//
//         await connectToDatabase('login');
//
//         const user: any | null = await userSchema
//             .findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } })
//             .populate({
//                 path: 'profileImage',
//                 select: 'filePath',
//                 model: 'file',
//                 options: { strictPopulate: false },
//             });
//
//         if (!user){
//             return errorMessage
//         }
//         const isPasswordCorrect: boolean = await bcrypt.compare(password, user.password);
//
//         if (!isPasswordCorrect){
//             return errorMessage
//         }
//
//         const token: string = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_KEY, {
//             expiresIn: tokenExpireTime,
//         });
//
//         const { username: userDataUsername, draftPost, role, keyMaster, profileImage, _id } = user;
//         const userData = { username: userDataUsername, draftPost, role, keyMaster, profileImage, _id };
//
//         return{
//             token,
//             userData,
//             success: true,
//             message: 'Login successful'
//         }
//     }catch (error){
//         console.log('\x1b[33m%s\x1b[0m','error => ',error );
//     }
// }

export const register = async ({}: IRegister) => {

};
