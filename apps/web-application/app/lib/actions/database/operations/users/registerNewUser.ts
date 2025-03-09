'use server';
import { userSchema, connectToDatabase } from '@repo/db';
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import bcrypt from 'bcryptjs';
import { generateJwtToken } from '@lib/actions/database/tools';
import { IRegisterNewUser, User } from '@repo/typescript-types';
import { sendVerificationEmail } from '@lib/emailService';
import {
  emailValidator,
  passwordValidatorRegisterForm,
  usernameValidatorRegisterForm,
} from '@repo/utils/dist/src/validators';

const validateInputs = (
  {
    username,
    email,
    password,
    password2,
  }: IRegisterNewUser): { message: string; type: string } | undefined => {
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

const saveUser = async (user: object): Promise<void> => {
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

export const registerNewUser = async (
  {
    username,
    email,
    password,
    password2,
  }: IRegisterNewUser): Promise<{ message: string; type: string } | undefined> => {
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
      ? generateJwtToken({ type: 'accountVerification' })
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

export default registerNewUser;