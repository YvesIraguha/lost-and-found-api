import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import createToken from '../../../src/helpers/token';

describe('Generate the jwt token', () => {
  it('Should return a jwt token', async (done) => {
    const payload = {
      _id: mongoose.Types.ObjectId().toHexString(),
      username: 'Username',
      platform: 'email',
      email: 'email@email.com'
    };
    const token = await createToken(payload);
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    expect(decoded).toMatchObject(payload);
    done();
  });
  it('Should throw an error if payload is invalid', async (done) => {
    expect(() => createToken(null)).toThrow();
    done();
  });
});
