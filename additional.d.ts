namespace NodeJS {
    interface ProcessEnv {
        BACKEND_BASE_URL: string;
        CLERK_SECRET_KEY: string;
        GOOGLE_SEARCH_API_KEY: string;
        GOOGLE_SEARCH_CONTEXT_KEY: string;
        MONGODB_URI: string;
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
        OPENAI_API_CHAT_MODEL: string;
        OPENAI_API_KEY: string;
        OPENAI_API_TRANSLATE_MODEL: string;
    }
}