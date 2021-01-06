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
  const endPoint = '/api/v1/items/lost';
  describe('/items/lost', () => {
    it('Should save lost document to the our database', async (done) => {
      try {
        const user = {
          _id: mongoose.Types.ObjectId,
          username: 'username',
          platform: 'email',
          email: 'email@email.com'
        };

        const doc = {
          documentTitle: 'docName',
          documentID: 'doc-number',
          status: 'lost',
          location: {
            sector: 'sector',
            district: 'district'
          }
        };

        const authToken = await token(user);
        const res = await request(server)
          .post(endPoint)
          .set('auth-token', authToken)
          .send(doc);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('newDoc');
        expect(res.body.newDoc.documentTitle).toBe(doc.documentTitle);
        expect(res.body.newDoc.documentID).toBe(doc.documentID);
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
