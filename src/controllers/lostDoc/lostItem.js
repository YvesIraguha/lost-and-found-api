import LostItems from '../../models/lost';

const recordLostItem = async (req, res) => {
  try {
    const {
      documentName,
      documentNumber,
      sector,
      district,
      isRewarded,
      price
    } = req.body;

    const adDoc = await LostItems.findOne({
      documentName,
      documentNumber,
      'status.isLost': true
    });
    if (adDoc) {
      return res
        .status(403)
        .send({ msg: 'Your document was advertised before' });
    }

    const foundDoc = await LostItems.findOne({
      documentName,
      documentNumber,
      'status.isFound': true
    });
    if (foundDoc) return res.status(200).send({ msg: 'Your document was Found' });

    const doc = new LostItems({
      user: req.user._id,
      status: {
        isLost: true
      },
      documentName,
      documentNumber,
      place: {
        sector,
        district
      },
      isRewarded,
      price
    });

    const newDoc = await doc.save();
    return res.status(201).send({ newDoc });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

export default recordLostItem;
