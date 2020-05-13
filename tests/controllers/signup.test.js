import mongoose from 'mongoose';
import request from 'supertest';
import server from '../../src/app';
import models, { url } from '../../src/models';

describe('Signup', () => {
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
  const { User } = models;
  describe(endPoint, () => {
    it('Should return 400 if user already exist', async (done) => {
      const user = {
        firstName: 'firstName',
        secondName: 'secondName',
        username: 'username',
        email: 'email@email.com',
        password: 'password',
        phoneNumber: '0780000000'
      };
      const newUser = new User(user);
      await newUser.save();
      const res = await request(server).post(endPoint).send(user);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('msg');
      expect(res.body.msg).toMatch(/exist/);
      done();
    });
    it('Should  create new user account', async (done) => {
      const user = {
        firstName: 'firstName',
        secondName: 'secondName',
        username: 'username',
        email: 'anyemail@email.com',
        password: 'password',
        phoneNumber: '0780000000'
      };

      const res = await request(server).post(endPoint).send(user);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('newUser');
      expect(res.body.newUser).toHaveProperty('_id');
      expect(res.body.newUser.email).toBe(user.email);
      done();
    });
  });
});
