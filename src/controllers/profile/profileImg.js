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
        .send({ msg: 'Profile Picture updated successfully', user });
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
        .send({ msg: 'Info successfully updated', result });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
};
