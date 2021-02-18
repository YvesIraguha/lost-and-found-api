/* eslint-disable no-underscore-dangle */
import createToken from '../../helpers/token';

const googleLoginController = async (req, res) => {
  try {
    const token = await createToken(req.user);
    res.status(200).json({ token, user: req.user });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export default googleLoginController;
