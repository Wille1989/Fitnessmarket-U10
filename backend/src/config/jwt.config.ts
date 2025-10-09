const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET) {
    throw new Error('JWT hemligheten saknas!');
};

export const jwtConfig = {
    secret: JWT_SECRET,
    expiresIn: '2h'
};