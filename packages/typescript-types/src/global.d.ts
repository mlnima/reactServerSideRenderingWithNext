import { UploadedFile } from 'express-fileupload';

declare module '@repo/utils';
declare module '@repo/data-structures';
declare module 'tsconfig';
declare module '@repo/ui';
declare module '@repo/shared-style';
declare module 'simple-youtube-api';

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'express-fileupload' {
  interface FileArray {
    file?: UploadedFile | UploadedFile[];
  }
}

declare global {
  type MDXProvidedComponents = typeof components;
}

declare global {
  namespace Express {
    interface Request {
      userData?: { _id: string };
      auth?: TVerifySession;
    }
  }
}

export {};
