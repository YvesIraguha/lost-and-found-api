import response from '../helpers/response';

export default (cb) => async (req, res) => {
  try {
    return await cb(req, res);
  } catch (error) {
    return response.error(res, 'Internal server error', 500);
  }
};
