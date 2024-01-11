const login = (email: string, password: string) => {
  if (!email || !password) {
    return { code: 404, message: ('Email and password are required') };
  }
  return { code: 200, message: ('Login successful') };
};
export default {
  login,
};
