// @ts-nocheck

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        NEXT_PUBLIC_PRODUCTION_URL: string;
        NEXT_PUBLIC_API_SERVER_URL: string;
        NEXT_PUBLIC_LOCALES: string;
        NEXT_PUBLIC_DEFAULT_LOCALE: string;
        NEXT_PUBLIC_SOCKET: string;
        PORT: string; // Ports are typically passed as strings in environment variables
        API_SERVER_PORT: string; // Keep as string, you can parse it as number later if needed
        DEV_DASHBOARD_PORT: string; // Same as above
        DB_NAME: string;
        DB_HOST: string;
        DB_USER: string;
        DB_PASS: string;
        DB_PORT: string; // Keep as string, parse as number if needed
        EXCLUDE_POSTS_SOURCE: string;
        MAIL_SERVER: string; // Environment variables are usually strings, you can convert to boolean as needed
        MAIL_SERVER_HOST: string;
        MAIL_EXTENSION: string;
        SSL_CERT: string;
        SSL_KEY: string;
        JWT_KEY: string;
    }
}

export {}

