/* eslint-disable no-underscore-dangle */
export default (cb) => async (req, res) => {
  try {
    await cb(req, res);
  } catch (error) {
    res.status(500).send({ message: res.__('Internal server error') });
  }
};
