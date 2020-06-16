import mongoose from 'mongoose';
import request from 'supertest';
import server from '../../../src/app';
import { url } from '../../../src/models';
import token from '../../../src/helpers/token';

describe('LOST ITEM', () => {
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
  const endPoint = '/api/v1/item/lost';
  describe('/items/lost', () => {
    it('Should save lost document to the our database', async (done) => {
      const user = {
        _id: mongoose.Types.ObjectId,
        username: 'username',
        platform: 'email',
        email: 'email@email.com'
      };

      const doc = {
        documentName: 'docName',
        documentNumber: 'doc-number',
        lostPlace: {
          sector: 'sector',
          district: 'district'
        },
        status: {
          isFound: true,
          isLost: true
        }
      };

      const authToken = await token(user);
      const res = await request(server)
        .post(endPoint)
        .set('auth-token', authToken)
        .send(doc);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('newDoc');
      expect(res.body.newDoc.documentName).toBe(doc.documentName);
      expect(res.body.newDoc.documentNumber).toBe(doc.documentNumber);
      done();
    });
  });
});
