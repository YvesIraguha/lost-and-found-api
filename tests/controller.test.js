import request from 'supertest';
import Lost from '../models/model';

let server;

describe('/lostAndFound', () => {
  beforeEach(async () => {
    server = require('../src/index');
    await Lost.insertMany([
      {
        name: 'firstname',
        number: '0789121324'
      },
      {
        name: 'secondname',
        number: '12344'
      }
    ]);
  });

  afterEach(async () => {
    server.close();
    await Lost.deleteMany({});
  });

  describe('GET', () => {
    it('should get all documents', async () => {
      const res = await request(server).get('/lostAndFound/lost');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe('POST', () => {
    it('should return a status of 400 if document exist', async () => {
      const doc = {
        name: 'firstname',
        number: '0789121324'
      };
      const res = await request(server).post('/lostAndFound/lost').send(doc);

      expect(res.status).toBe(400);
    });
    it('should post a document on the db', async () => {
      const doc = {
        name: 'ThisName',
        number: '123345'
      };

      const res = await request(server).post('/lostAndFound/lost').send(doc);

      expect(res.status).toBe(200);
    });
  });
});
