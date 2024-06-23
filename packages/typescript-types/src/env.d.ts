declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        NEXT_PUBLIC_PRODUCTION_URL: string;
        NEXT_PUBLIC_API_SERVER_URL: string;
        NEXT_PUBLIC_LOCALES: string;
        NEXT_PUBLIC_DEFAULT_LOCALE: string;
        NEXT_PUBLIC_SOCKET: string;
        PORT: string;
        API_SERVER_PORT: string;
        DEV_DASHBOARD_PORT: string;
        DB_NAME: string;
        DB_HOST: string;
        DB_USER: string;
        DB_PASS: string;
        DB_PORT: string;
        EXCLUDE_POSTS_SOURCE: string;
        MAIL_SERVER: string;
        MAIL_SERVER_HOST: string;
        MAIL_EXTENSION: string;
        SSL_CERT: string;
        SSL_KEY: string;
        JWT_KEY: string;
    }
}
//# sourceMappingURL=env.d.ts.map