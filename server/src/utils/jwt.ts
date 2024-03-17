import jwt, { Secret } from 'jsonwebtoken';

const verifyAuthToken = (payload: string): string | jwt.JwtPayload => {
    const jwtSecret = config.jwtSecret as Secret;
    return jwt.verify(payload, jwtSecret);
}

const generateAuthToken = (payload: any): string => {
    const jwtSecret = config.jwtSecret as Secret;
    return jwt.sign(payload, jwtSecret, {
        expiresIn: config.jwtExpiresIn
    });
}

export { generateAuthToken, verifyAuthToken };