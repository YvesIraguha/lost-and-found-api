import hashPassword from '../../helpers/hashPwd';
import createToken from '../../helpers/token';
import User from '../../models/user';

const signupController = async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send({ msg: 'Email already exist' });

  const hashedPassword = await hashPassword(req.body.password);

  const user = new User({
    platform: 'email',
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    phoneNumber: req.body.phoneNumber,
    date: {
      timestamp: new Date()
    }
  });
  try {
    const newUser = await user.save();
    const token = await createToken(newUser);
    return res.status(201).send({ token, newUser });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

export default signupController;
