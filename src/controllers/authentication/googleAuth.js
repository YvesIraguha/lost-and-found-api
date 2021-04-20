import response from '../../helpers/response';
import createToken from '../../helpers/token';

const googleLoginController = async (req, res) => {
  const token = await createToken(req.user);
  const message = 'You are successfully loged in';
  return response.success(res, message, { token, user: req.user });
};

export default googleLoginController;
