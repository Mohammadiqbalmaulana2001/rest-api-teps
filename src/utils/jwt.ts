import 'dotenv/config';
import jsonwebtoken from 'jsonwebtoken';
import userType from '../types/user.type';

const generateAccessToken = (user: userType): string => {
    return jsonwebtoken.sign(user, String(process.env.JWT_SECRET), {
        expiresIn: '1800s',
    });
};

const generateRefreshToken = (user: userType): string => {
    return jsonwebtoken.sign(user, String(process.env.JWT_SECRET), {
        expiresIn: '86400s'
    });
};

export { generateAccessToken, generateRefreshToken };
