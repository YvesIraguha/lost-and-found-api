import User from '../../models/user';

export default async (req, res) => {
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
};
