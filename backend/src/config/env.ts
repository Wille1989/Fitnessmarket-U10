const required = (name: string): string => {
    const value = process.env[name];
    if(!value) {
        throw new Error(`Missing required env variabel:${name}`)
    }
    return value;
};

export const env = {
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    PORT: Number(process.env.PORT ?? 3000),
    MONGO_URI: required('MONGO_URI'),
    JWT_SECRET: required('JWT_SECRET'),
    CORS_ORIGINS: (process.env.CORS_ORIGINS ?? 'http://localhost:4200').split(','),
};