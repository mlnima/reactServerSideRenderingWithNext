import { Schema } from "mongoose";
declare module '@repo/api-requests';
declare module '@repo/utils';
declare module '@repo/utils';
declare module '@repo/data-structures';
declare module '@repo/react-hooker-lib';
declare module 'tsconfig';
declare module '@repo/ui';
declare module '@repo/shared-style';
declare module 'simple-youtube-api';

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}


declare function mongooseLeanVirtuals(schema: Schema): void;

declare namespace mongooseLeanVirtuals {}

export = mongooseLeanVirtuals;










// declare module 'axios' {
//     export interface AxiosResponse<T = any> {
//         data: T & { message?: string }; // Extend response data with an optional message property
//     }
//
//     export interface AxiosError<T = any> {
//         response?: AxiosResponse<T>;
//     }
// }

// declare module '*';
// export {};
//
// declare namespace NodeJS {
//     interface ProcessEnv {
//         NODE_ENV: string;
//         JWT_KEY:string;
//         NEXT_PUBLIC_PRODUCTION_URL:string;
//         NEXT_PUBLIC_API_SERVER_URL:string;
//         NEXT_PUBLIC_LOCALES:string;
//         NEXT_PUBLIC_DEFAULT_LOCALE:string;
//         NEXT_PUBLIC_SOCKET:string;
//         NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES:string;
//         PORT:string;
//         API_SERVER_PORT:string;
//         REACT_APP_DEV_DASHBOARD_PORT:string;
//         DB_NAME:string;
//         DB_HOST:string;
//         DB_USER:string;
//         DB_PASS:string;
//         DB_PORT:string;
//         MAIL_SERVER:string;
//         MAIL_SERVER_HOST:string;
//         MAIL_EXTENSION:string;
//         SSL_CERT:string;
//         SSL_KEY:string;
//
//         // Add any other environment variables here
//     }
// }


