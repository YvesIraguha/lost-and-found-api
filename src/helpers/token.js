import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (data) => {
  const secretKey = process.env.SECRET_KEY;
  try {
    const token = jwt.sign({
      _id: data._id,
      username: data.username,
      platform: data.platform,
      email: data.email
    },
    secretKey,
    {
      algorithm: 'HS256',
      expiresIn: '7d'
    });
    return token;
  } catch (error) {
    throw new Error('Unable to generate a token');
  }
};

export default createToken;
