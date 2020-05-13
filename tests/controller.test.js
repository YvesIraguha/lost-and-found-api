import mongoose from 'mongoose';
import request from 'supertest';
import server from '../src/app';
import { url } from '../src/models';

describe('/lost', () => {
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
  describe('GET', () => {
    it('should get all documents', async (done) => {
      const res = await request(server).get('/api/v1/lost');
      expect(res.status).toBe(200);
      expect(res.body.items.length).toBe(0);
      done();
    });
  });

  describe('POST', () => {
    it('should post a document on the db', async (done) => {
      const doc = {
        name: 'firstname',
        description: '0789121324'
      };
      const res = await request(server).post('/api/v1/lost').send(doc);
      expect(res.status).toBe(201);
      expect(res.body.item.name).toBe(doc.name);
      expect(res.body.item.description).toBe(doc.description);
      done();
    });
    it('should post another document on the db', async (done) => {
      const doc = {
        name: 'ThisName',
        description: '123345'
      };
      const res = await request(server).post('/api/v1/lost').send(doc);
      expect(res.status).toBe(201);
      expect(res.body.item.name).toBe(doc.name);
      expect(res.body.item.number).toBe(doc.number);
      done();
    });
  });
});
