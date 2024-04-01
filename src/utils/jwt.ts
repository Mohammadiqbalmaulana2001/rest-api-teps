import 'dotenv/config';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import userType from '../types/user.type';

const generateAccessToken = (user: userType): string => {
    return jsonwebtoken.sign(user, String(process.env.JWT_SECRET), {
        expiresIn: '1800s',
    });
};

const verifyAccessToken = (token: string): string | null | JwtPayload => {
    try {
        return jsonwebtoken.verify(token, String(process.env.JWT_SECRET));
    } catch (error) {
        return null
    }
}
const generateRefreshToken = (user: userType): string => {
    return jsonwebtoken.sign(user, String(process.env.JWT_REFRESH_SCREET), {
        expiresIn: '86400s'
    });
};

const verifyRefreshToken = (token: string):string | null | JwtPayload => {
    try {
        return jsonwebtoken.verify(token, String(process.env.JWT_REFRESH_SCREET));
    } catch (error) {
        return null
    }
}

const parseJWT = (token : string): userType => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
}

export { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken, parseJWT };
