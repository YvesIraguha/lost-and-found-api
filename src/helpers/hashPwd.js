import bcrypt from 'bcryptjs';

const hashPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass, salt);
  return hashedPassword;
};

export default hashPassword;
