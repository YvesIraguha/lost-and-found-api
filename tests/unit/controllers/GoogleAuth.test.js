import mongoose from 'mongoose';
import { mockResponse, mockRequest } from '../util/interceptor';
import controller from '../../../src/controllers/authentication';

describe('Google Auth', () => {
  const req = mockRequest();
  const res = mockResponse();
  it('Should return 200 and user if login success', async (done) => {
    req.user = {
      _id: mongoose.Types.ObjectId(),
      username: 'username',
      firstName: 'firstName',
      secondName: 'secondName',
      email: 'email@email.com',
      platform: 'google',
      date: {
        timestamp: new Date()
      }
    };

    await controller.googleAuthController(req, res);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledWith(200);
    done();
  });
  it('Should return 500 if something went wrong', async (done) => {
    req.user = undefined;
    await controller.googleAuthController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Internal error,' });
    done();
  });
});
