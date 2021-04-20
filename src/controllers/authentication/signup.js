/* eslint-disable no-underscore-dangle */
import hashPassword from '../../helpers/hashPwd';
import createToken from '../../helpers/token';
import response from '../../helpers/response';
import User from '../../models/user';

const signupController = async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return response.error(res, 'Email already exist', 409);

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

  const newUser = await user.save();
  const token = await createToken(newUser);
  const {
    firstName,
    secondName,
    username,
    email,
    phoneNumber,
    date: createdAt,
    _id
  } = newUser;
  return response.success(
    res,
    'You are account has been created successfuly',
    {
      token,
      user: {
        firstName,
        secondName,
        username,
        email,
        phoneNumber,
        createdAt,
        _id
      }
    },
    201
  );
};

export default signupController;
