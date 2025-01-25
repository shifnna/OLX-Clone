import jwt from 'jsonwebtoken';

const options = {
    expiresIn: '7d'
};

export const generateToken = async (payload) => {
    const SECRET_KEY = 'my_secret_key'
  try {
    if (!SECRET_KEY) {
      console.error('SECRET_KEY is missing');
      throw new Error('SECRET_KEY is not defined');
    }
    const token = jwt.sign(payload, SECRET_KEY, options);
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Token generation failed');
  }
};