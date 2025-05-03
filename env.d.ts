declare namespace NodeJS {
    interface ProcessEnv {
        GMAIL_USER: string;
        GMAIL_APP_PASSWORD: string;
        API_SECRET_KEY: string;
        ALLOWED_DOMAINS: string;
        RATE_LIMIT_POINTS: string;
        RATE_LIMIT_DURATION: string;
    }
} 