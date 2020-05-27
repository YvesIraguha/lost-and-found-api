import bcrypt from 'bcryptjs';
import createToken from '../../helpers/token';
import User from '../../models/user';

const loginController = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ msg: 'Email or Password invalid' });

  try {
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send({ msg: 'Invalid password' });

    const token = await createToken(user);
    return res.status(200).send({ msg: 'Logged in successfully', token });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

export default loginController;
