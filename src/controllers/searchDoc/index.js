import Document from '../../models/lost';

class SearchController {
  static async searchDocument(req, res) {
    try {
      const { query } = req.body;
      const data = await Document.find({
        $text: { $search: query }
      })
        .populate('user', 'username email phoneNumber -_id')
        .populate('foundsBy', 'username email phoneNumber -_id');
      if (!data || data.length === 0) return res.status(404).json({ msg: 'No Documents found' });

      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }
}

export default SearchController;
