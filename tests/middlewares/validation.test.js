import mongoose from 'mongoose';
import request from 'supertest';
import server from '../../src/app';
import { url } from '../../src/models';

describe('Hapi validation', () => {
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
  const endPoint = '/api/v1/users/signup';
  describe(endPoint, () => {
    it('Should return 400 if some user proporty (phoneNumber) are missing', async (done) => {
      const user = {
        firstName: 'firstName',
        secondName: 'secondName',
        username: 'username',
        email: 'email@email.com',
        password: 'password'
      };
      const res = await request(server).post(endPoint).send(user);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('msg');
      expect(res.body.msg).toMatch(/required/);
      done();
    });
    it('Should return 400 if email is envalid', async (done) => {
      const user = {
        firstName: 'firstName',
        secondName: 'secondName',
        username: 'username',
        email: 'invalidEmail.com',
        password: 'password',
        phoneNumber: '0780000000'
      };
      const res = await request(server).post(endPoint).send(user);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('msg');
      expect(res.body.msg).toMatch(/valid email/);
      done();
    });
    it('Should retrun 400 if password character is below 6', async (done) => {
      const user = {
        firstName: 'firsName',
        secondName: 'secondName',
        username: 'Any Name',
        email: 'my@email.com',
        password: 'pass',
        phoneNumber: '0780000000'
      };
      const res = await request(server).post(endPoint).send(user);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('msg');
      expect(res.body.msg).toMatch(/6 characters long/);
      expect(res.body.msg).toMatch(/password/);
      done();
    });
    it('Should retrun 400 if phone number is below 10 number', async (done) => {
      const user = {
        firstName: 'firsName',
        secondName: 'secondName',
        username: 'Any Name',
        email: 'my@email.com',
        password: 'password',
        phoneNumber: '0780000'
      };
      const res = await request(server).post(endPoint).send(user);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('msg');
      expect(res.body.msg).toMatch(/10 characters long/);
      expect(res.body.msg).toMatch(/phoneNumber/);
      done();
    });
  });
});
