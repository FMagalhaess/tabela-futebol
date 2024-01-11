import * as jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'secretPimbation';

const generateToken = (payload : any) : unknown => jwt.sign(payload, SECRET_KEY);

export default generateToken;
