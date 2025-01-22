import { postTypes } from '@repo/data-structures';


export const emailValidator = (email: string | undefined): boolean => {
  if (!email) return false;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const passwordValidatorRegisterForm = (password: string | undefined): boolean => {
  if (!password) return false;
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,}/.test(password);
};

export const usernameValidatorRegisterForm = (username: string | undefined): boolean => {
  if (!username) return false;
  const regex = /^[a-zA-Z][a-zA-Z0-9]{5,14}$/;
  let isValid = regex.test(username);

  if (username.toLowerCase().includes('admin')) {
    isValid = false;
  }
  return isValid;
};

export const mongoIdValidatorByRegex = (_id: string): boolean => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(_id);
};

export const postTypeValidator = (currentPostType: string) => {
  return currentPostType ? postTypes.includes(currentPostType) : false;
};