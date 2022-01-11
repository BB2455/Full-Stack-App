import decodeAccessToken from './decodeAccessToken.js';

const authJWT = async (req, res, next) => {
  if (process.env.NODE_ENV === 'TEST') return next();
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
      const decodedData = decodeAccessToken(token);
      req.userID = decodedData?.id;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export default authJWT;
