/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcryptjs';
import createToken from '../../helpers/token';
import User from '../../models/user';
import response from '../../helpers/response';

const loginController = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return response.error(res, 'Email or password incorrect', 403);

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return response.error(res, 'Email or password incorrect', 403);

  const token = await createToken(user);
  return response.success(res, 'Logged in successfully', { token });
};

export default loginController;
