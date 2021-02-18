/* eslint-disable no-underscore-dangle */
import Document from '../../models/lost';

class SearchController {
  static async searchFoundItem(req, res) {
    try {
      const foundDocs = await Document.find({
        $and: [
          { documentName: req.body.documentName },
          { 'status.isFound': true }
        ]
      });
      if (foundDocs.length === 0) return res.status(400).json({ msg: res.__('No such document in database') });

      return res.status(200).send({ foundDocs });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  }

  static async searchLostItem(req, res) {
    try {
      const lostDocs = await Document.find({
        $and: [
          { documentName: req.body.documentName },
          { 'status.isLost': true }
        ]
      });
      if (lostDocs.length === 0) return res.status(400).json({ msg: res.__('No such document in database') });

      return res.status(200).send({ lostDocs });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  }
}

export default SearchController;
