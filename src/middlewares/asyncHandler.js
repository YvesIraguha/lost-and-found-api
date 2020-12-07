export default async (cb) => async (req, res) => {
  try {
    await cb(req, res);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};
