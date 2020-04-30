import jwt from 'jsonwebtoken';

export const auth = (req, res, next) =>{
    const token = res.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
    } catch(err) {
        res.status(400).send('Invalid Token');
    }
}