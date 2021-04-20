import mongoose from 'mongoose';
import request from 'supertest';
import server from '../../../src/app';
import { url } from '../../../src/models';

describe('Login', () => {
  const endPoint = '/api/v1/users/login';
  beforeAll((done) => {
    mongoose.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        mongoose.connection.db.dropDatabase(() => {
          done();
        });
      }
    );
  });
  beforeEach(async () => {
    const user = {
      firstName: 'firstName',
      secondName: 'secondName',
      username: 'username',
      email: 'anyemail@email.com',
      password: 'password',
      phoneNumber: '0780000000'
    };
    await request(server).post('/api/v1/users/signup').send(user);
  });

  describe(endPoint, () => {
    it('Should warn a user if no account found', async (done) => {
      const user = {
        username: 'username',
        email: 'email@email.com',
        password: 'password'
      };
      const res = await request(server).post(endPoint).send(user);
      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toMatch(/incorrect/i);
      done();
    });
    it("Should warn a user if password didn't match", async (done) => {
      const user = {
        username: 'username',
        email: 'anyemail@email.com',
        password: 'wrongPass'
      };
      const res = await request(server).post(endPoint).send(user);
      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toMatch(/incorrect/);
      expect(res.body.error).toMatch(/password/);
      done();
    });
    it('Should  allow user to login if account found', async (done) => {
      const account = {
        email: 'anyemail@email.com',
        username: 'username',
        password: 'password'
      };
      const res = await request(server).post(endPoint).send(account);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('message');
      done();
    });
  });
});
