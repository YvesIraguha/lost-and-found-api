import mongoose from 'mongoose';
import { mockResponse, mockRequest } from '../util/interceptor';
import itemsController from '../../../src/controllers/items';
import models from '../../../src/models';

describe('register a lost item', () => {
  const res = mockResponse();
  const req = mockRequest();
  const { LostItems } = models;

  it('Should return 403 if document was advertised', async (done) => {
    const doc = {
      documentTitle: 'docName',
      documentID: 'doc-number',
      user: mongoose.Types.ObjectId(),
      location: {
        sector: 'sector',
        district: 'district'
      },
      status: 'lost'
    };

    const newDoc = new LostItems(doc);
    await newDoc.save();
    req.body = doc;

    await itemsController.recordLostItem(req, res);

    expect(newDoc).toBeInstanceOf(LostItems);
    expect(res.status).toHaveBeenCalledWith(403);
    done();
  });
  // it('Should return 200 if the document was found', async (done) => {
  //   const doc = {
  //     documentName: 'docName1',
  //     documentNumber: 'doc-number',
  //     user: mongoose.Types.ObjectId(),
  //     lostPlace: {
  //       sector: 'sector',
  //       district: 'district'
  //     },
  //     status: {
  //       isFound: true
  //     }
  //   };

  //   const newDoc = new LostItems(doc);
  //   await newDoc.save();
  //   req.body = doc;

  //   await itemsController.recordLostItem(req, res);
  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res.send).toHaveBeenCalledWith({ msg: 'Your document was Found' });
  //   done();
  // });
  // it('Should return 201 if document is successfully recorded', async (done) => {
  //   req.user = {
  //     _d: mongoose.Types.ObjectId(),
  //     platform: 'google'
  //   };
  //   const doc = {
  //     documentName: 'documentName',
  //     documentNumber: 'doc-number',
  //     lostPlace: {
  //       sector: 'sector',
  //       district: 'district'
  //     },
  //     status: {
  //       isFound: true
  //     }
  //   };
  //   req.body = doc;

  //   await itemsController.recordLostItem(req, res);

  //   expect(res.status).toHaveBeenCalledWith(201);
  //   done();
  // });
  it('Should return 400 if req is invalid', async (done) => {
    req.body = undefined;

    await itemsController.recordLostItem(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    done();
  });
});
