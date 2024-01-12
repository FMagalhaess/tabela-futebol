import * as bcrypt from 'bcryptjs';
import jwtChecker from '../Utils/JWTChecker';
import generateToken from '../Utils/passwordCrypter';
import Users from '../database/models/Users';

const findEmail = async (email: string) => {
  const emailChekcer = await Users.findOne({ where: { email } });
  if (!emailChekcer) {
    return { code: 401, message: { message: 'Invalid email or password' } };
  }
  return { code: 200, message: emailChekcer };
};
const checkPassword = async (email: string, password: string) => {
  const passwordChecker = await Users.findOne({ where: { email } });
  if (passwordChecker) {
    const { dataValues } = passwordChecker;
    const decryptedPassword = bcrypt.compareSync(password, dataValues.password);
    if (!decryptedPassword) {
      return { code: 401, message: { message: 'Invalid email or password' } };
    }
    return { code: 200, message: decryptedPassword };
  }
  return { code: 200, message: passwordChecker };
};
const login = async (email: string, password: string, authorization: any) => {
  const emailChecker = await findEmail(email);
  const emailFinder = await Users.findOne({ where: { email } });
  let token;
  if (emailFinder) {
    token = generateToken({ email, password, role: emailFinder.dataValues.role });
  }
  // console.log(emailChecker.message.dataValues);
  const passWordChecker = await checkPassword(email, password);
  if (emailChecker.code === 401) {
    return { code: 401, message: emailChecker.message };
  }
  if (passWordChecker.code === 401) {
    return { code: 401, message: passWordChecker.message };
  }
  const header = jwtChecker(authorization);
  // if (authorization !== 'admin' && authorization !== 'user') {
  //   return { code: 401, message: { message: 'Invalid email or password' } };
  // }
  console.log('header');
  console.log(header);
  return { code: 200, message: { token } };
};
// const getRole = async (email: string) => {

// };
export default {
  login,
  findEmail,
};
