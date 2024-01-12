import * as jwt from 'jsonwebtoken';

const realToken = (old : any) => old.split(' ')[1];

const jwtChecker = (jwtTokenToVerify : any) => {
  const SECRET_KEY = process.env.JWT_SECRET || 'secretPimbation';
  try {
    const token = realToken(jwtTokenToVerify);
    const tokenResponse = jwt.verify(token, SECRET_KEY);
    return tokenResponse;
  } catch (err) {
    return { code: 401, response: { message: 'Expired or invalid token' } };
  }
};
export default jwtChecker;
