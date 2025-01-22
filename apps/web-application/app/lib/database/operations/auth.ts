'use server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase, userSchema } from '@repo/db';
import { User } from '@repo/typescript-types';
import { Document } from 'mongoose';
import { getSettings } from '@lib/database/operations/settings';
import { sendVerificationEmail } from '@lib/emailService';

import {
  emailValidator,
  passwordValidatorRegisterForm,
  usernameValidatorRegisterForm,
} from '@repo/utils';
import {
  jwtValidator,
} from '@repo/utils-server';


// let transporter: nodemailer.Transporter<SentMessageInfo>;
const tokenExpireTime = '365d';

interface ILogin {
  username: string;
  password: string;
}

interface IOLogin {
  token: string | null | undefined;
  userData: object | null;
  success: boolean;
  message: string;
}

//helpers
const validateInputs = ({
                          username,
                          email,
                          password,
                          password2,
                        }: {
  username: string;
  email: string;
  password: string;
  password2: string;
}): { message: string; type: string } | undefined => {
  if (!usernameValidatorRegisterForm(username)) {
    return { message: 'Invalid Username', type: 'error' };
  }
  if (!passwordValidatorRegisterForm(password)) {
    return { message: 'Invalid Password', type: 'error' };
  }
  if (!emailValidator(email)) {
    return { message: 'Invalid Email', type: 'error' };
  }
  if (password !== password2) {
    return { message: 'Passwords Do Not Match', type: 'error' };
  }
};

const checkUserExistence = async (
  username: string,
  email: string,
): Promise<{ message: string; type: string } | undefined> => {
  const user = await userSchema
    .findOne({
      $or: [
        { username: { $regex: new RegExp(`^${username.toLowerCase()}$`, 'i') } },
        { email: { $regex: new RegExp(`^${email.toLowerCase()}$`, 'i') } },
      ],
    });

  if (user) {
    return { message: 'Username or Email already exists', type: 'error' };
  }
};

const generateVerificationToken = (): string => {
  return jwt.sign({ type: 'accountVerification' }, process.env.JWT_KEY, {
    expiresIn: '1h',
  });
};

const saveUser = async (user: User): Promise<void> => {
  const newUser = new userSchema(user);
  await newUser.save();
};

const handleVerificationEmail = async (
  email: string,
  verificationToken: string,
): Promise<{ message: string; type: string }> => {
  try {
    await sendVerificationEmail(email, verificationToken);
    return {
      message:
        'Verification Email Has Been Sent To Your Email Address. Please Check Your Email To Verify Your Account.',
      type: 'info',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      message: 'Your account has been created, but we could not send a verification email.',
      type: 'warning',
    };
  }
};
//----


export const login = async (
  {
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
      { expiresIn: tokenExpireTime },
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

// export const tokenVerifier = async (token: string) => {
//   try {
//     return jwt.verify(token, process.env.JWT_KEY as string);
//   } catch (error) {
//     return null;
//   }
// };

interface IAutoLogin {
  fields: string[],
  token: string
}

export const autoLogin = async ({ fields, token }: IAutoLogin) => {
  try {
    await connectToDatabase('autoLogin');
    const tokenData = await jwtValidator(token);
    if (!tokenData || !tokenData?._id) {
      return null;
    }
    let user = await userSchema
      .findById(tokenData._id)
      .select(fields || ['username', 'role', 'profileImage'])
      .populate({
        path: 'profileImage',
        select: 'filePath',
        model: 'file',
        options: { strictPopulate: false },
      })
      .lean();
    if (user?._id) {
      user._id = user._id.toString();
    }
    if (user?.profileImage?._id) {
      user.profileImage._id = user.profileImage._id.toString();
    }
    return user;
  } catch (error) {
    console.log(`error=> `, error);
    return null;
  }
};


interface IRegister {
  username: string;
  email: string;
  password: string;
  password2: string;
}

// Example: Separate email logic

export const register = async (
  {
    username,
    email,
    password,
    password2,
  }: IRegister): Promise<{ message: string; type: string } | undefined> => {
  try {
    await connectToDatabase('register');

    const { initialSettings } = await getSettings(['initialSettings']);

    if (!initialSettings?.membershipSettings?.anyoneCanRegister) {
      return { message: 'Registration Is Disabled', type: 'error' };
    }

    const validationError = validateInputs({ username, email, password, password2 });

    if (validationError) return validationError;

    const existingUser = await checkUserExistence(username, email);
    if (existingUser) return existingUser;

    const shouldSendVerificationEmail =
      process.env.MAIL_SERVER === 'true' &&
      initialSettings?.membershipSettings?.verificationRequired;

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = shouldSendVerificationEmail
      ? generateVerificationToken()
      : '';

    const user = {
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      role: 'subscriber',
      password: hashedPassword,
      keyMaster: false,
      verificationToken,
    };

    await saveUser(user);

    if (shouldSendVerificationEmail && verificationToken) {
      return await handleVerificationEmail(email, verificationToken);
    }

    return {
      message: 'Your account has been successfully created. You can login now.',
      type: 'success',
    };
  } catch (error) {
    console.error('Error during register:', error);
    return {
      message: 'Unable to process your request at this time, please try again later.',
      type: 'error',
    };
  }
};


// export const register = async (
//   {
//     username,
//     email,
//     password,
//     password2,
//   }: IRegister) => {
//   try {
//     await connectToDatabase('register');
//     let response = {};
//     const { initialSettings } = await getSettings(['initialSettings']);
//     if (!initialSettings?.membershipSettings?.anyoneCanRegister) {
//       return { message: 'Registration Is Disabled' };
//     }
//     const shouldSendVerificationEmail =
//       process.env.MAIL_SERVER === 'true' && initialSettings?.membershipSettings?.verificationRequired;
//
//     const user = await userSchema
//       .findOne({
//         $or: [{ username: { $regex: new RegExp(`^${username.toLowerCase()}$`, 'i') } }, { email: { $regex: new RegExp(`^${email.toLowerCase()}$`, 'i') } }],
//       })
//       .exec();
//
//     if (user) {
//       response = { message: 'Username or Email already exists', type: 'error' };
//     }
//     if (!usernameValidatorRegisterForm(username)) {
//       response = { message: 'Invalid Username', type: 'error' };
//     }
//     if (!passwordValidatorRegisterForm(password)) {
//       response = { message: 'Invalid Password', type: 'error' };
//     }
//     if (!emailValidator(email)) {
//       response = { message: 'Invalid Email', type: 'error' };
//     }
//     if (password !== password2) {
//       response = { message: 'Passwords Do Not Match', type: 'error' };
//     }
//
//     bcrypt.hash(password, 10, (err, hash) => {
//       if (err) {
//         console.error(err);
//         response = {
//           message: 'Unable to process your request at this time, please try again later',
//           type: 'error',
//         };
//       }
//       const userData = {
//         username: username.toLowerCase(),
//         email: email.toLowerCase(),
//         role: 'subscriber',
//         password: hash,
//         keyMaster: false,
//         verificationToken: initialSettings?.membershipSettings?.verificationRequired
//           ? jwt.sign({ type: 'accountVerification' }, process.env.JWT_KEY, { expiresIn: '1h' })
//           : '',
//       };
//       const newUserData = new userSchema(userData);
//       newUserData
//         .save()
//         .then(() => {
//           if (shouldSendVerificationEmail && newUserData.verificationToken) {
//             const mailOptions = {
//               from: `verification@${process.env.MAIL_EXTENSION}`,
//               to: email,
//               subject: 'Account Verification',
//               html: `<p>
//                                      Thank you for registering on MyApp. Please click on the following
//                                      <a href="${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/v1/users/verification/${newUserData.verificationToken}">
//                                      link
//                                      </a>
//                                      to verify your account.
//                                    </p>`,
//               text: 'Thank you for registering on MyApp.',
//             };
//
//             transporter.sendMail(
//               mailOptions,
//               (
//                 error: any,
//                 info: {
//                   response: any;
//                 },
//               ) => {
//                 if (error) {
//                   console.error('Error sending email:', error);
//                 } else {
//                   console.log('Email sent:', info.response);
//                 }
//               },
//             );
//
//             response = {
//               message:
//                 'Verification Email Has Been Sent To Your Email Address. Please Check Your Email To Verify Your Account.',
//               type: 'info',
//
//             };
//           } else {
//             response = {
//               message: 'Your account has been successfully created. You can login now.',
//               type: 'success',
//             };
//           }
//         })
//         .catch((error: any) => {
//           console.log(error);
//           response = {
//             message: 'Unable to process your request at this time, please try again later',
//             type: 'error',
//           };
//         });
//     });
//     return response;
//   } catch (error) {
//     console.error('Error during register:', error);
//     return;
//   }
// };


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