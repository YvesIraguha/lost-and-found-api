import { Router } from 'express';
import Lost from '../../models/model';

const router = new Router();

router.post('/lost', async (req, res) => {
  const document = await Lost.findOne({ name: req.body.name });
  if (document) return res.status(400).json({ msg: 'document exist' });

  const lost = new Lost({
    name: req.body.name,
    number: req.body.number
  });

  try {
    const savedDoc = await lost.save();
    res.json({ msg: 'successfully saved' });
  } catch (error) {
    res.json({ msg: 'failed to save' });
  }
});

router.get('/lost', async (req, res) => {
  try {
    const findDoc = await Lost.find();
    res.json(findDoc);
  } catch (error) {
    res.json({ msg: error.message });
  }
});

module.exports = router;
