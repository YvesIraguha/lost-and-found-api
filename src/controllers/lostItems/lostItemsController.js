import LostItems from '../../models/lost';

export default {
  recordLostItem: async (req, res) => {
    try {
      const { name, description } = req.body;
      const recordItem = await LostItems.create({ name, description });
      res
        .status(201)
        .json({ message: 'Item created successfully', item: recordItem });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllLostItems: async (req, res) => {
    try {
      const recordItem = await LostItems.find();
      res
        .status(200)
        .json({ message: 'Items retrieved successfully', items: recordItem });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
