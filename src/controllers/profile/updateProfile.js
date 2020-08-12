import User from '../../models/user';

export default {
  profileImage: async (req, res) => {
    try {
      if (!req.file) return res.status(400).send({ msg: 'your photo can\'t be saved' });

      const user = await User.findByIdAndUpdate(req.user._id,
        { photoUrl: req.file.path },
        { new: true });

      return res
        .status(200)
        .send({
          msg: 'Profile Picture updated successfully',
          user: {
            firstName: user.firstName,
            secondName: user.secondName,
            username: user.username,
            phoneNumber: user.phoneNumber,
            email: user.email,
            photoUrl: user.photoUrl
          }
        });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  updateProfile: async (req, res) => {
    const {
      firstName, secondName, username, phoneNumber
    } = req.body;
    try {
      const user = await User.findById(req.user._id);
      user.set({
        firstName: firstName || user.firstName,
        secondName: secondName || user.secondName,
        username: username || user.username,
        phoneNumber: phoneNumber || user.phoneNumber
      });

      const result = await user.save();
      return res
        .status(200)
        .send({
          msg: 'Info successfully updated',
          result: {
            firstName: result.firstName,
            secondName: result.secondName,
            username: result.username,
            phoneNumber: result.phoneNumber
          }
        });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
};
