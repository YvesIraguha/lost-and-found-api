import request from 'supertest';
import server from '../../src/app';

describe('Authentication middleware', () => {
  const endPoint = '/api/v1/items/lost';
  it('Should Return 401 if no token provided', async (done) => {
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

    const res = await request(server).post(endPoint).send(doc);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('msg', 'Access Denied');
    done();
  });
  it('Should return 400 if token provided is invalid', async (done) => {
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

    const authToken = new Array(16).join('a');
    const res = await request(server)
      .post(endPoint)
      .set('auth-token', authToken)
      .send(doc);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('msg', 'Invalid Token');
    done();
  });
});
