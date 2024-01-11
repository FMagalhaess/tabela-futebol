import * as bcrypt from 'bcryptjs';
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
const login = async (email: string, password: string) => {
  const token = (generateToken({ email, password }));
  const emailChecker = await findEmail(email);
  const passWordChecker = await checkPassword(email, password);
  if (emailChecker.code === 401) {
    return { code: 401, message: emailChecker.message };
  }
  if (passWordChecker.code === 401) {
    return { code: 401, message: passWordChecker.message };
  }
  return { code: 200, message: { token } };
};
export default {
  login,
  findEmail,
};
