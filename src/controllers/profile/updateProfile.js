import User from '../../models/user';

export default {
  profileImage: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { photoUrl: req.body.photoUrl },
        { new: true }
      );

      return res.status(200).send({
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
    try {
      const user = await User.findById(req.user._id);
      user.set({
        ...req.body
      });

      const result = await user.save();
      return res.status(200).send({
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
  },
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.params._id, { password: 0 });

      return res.status(200).send({
        msg: 'success',
        profile: user
      });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  getAllProfiles: async (req, res) => {
    try {
      const profiles = await User.find({}, { password: 0 });

      return res.status(200).send({
        msg: 'Success',
        profiles
      });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  deleteProfile: async (req, res) => {
    try {
      const { deletedCount } = await User.deleteOne({ _id: req.params._id });

      if (deletedCount) {
        return res.status(200).send({
          msg: `Profile with id ${req.params._id} successfully deleted`
        });
      }
      return res.status(200).send({
        msg: `Profile with id ${req.params._id} does not exist`
      });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
};
