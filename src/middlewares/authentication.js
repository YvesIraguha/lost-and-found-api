/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send({ msg: res.__('Access Denied') });

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    return next();
  } catch (err) {
    return res.status(400).send({ msg: res.__('Invalid Token') });
  }
};

export default auth;
