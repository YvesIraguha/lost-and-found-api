import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send({ msg: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    return next();
  } catch (err) {
    return res.status(400).send({ msg: 'Invalid Token' });
  }
};

export default auth;
