import emailNotification from '../../helpers/sendEmail';
import FoundItem from '../../models/lost';


export default async (req, res) => {
  try {
    const {
      documentName,
      documentNumber,
      sector,
      district,
      isRewarded,
      price
    } = req.body;

    const registerDoc = await FoundItem.findOne({
      documentName,
      documentNumber,
      'status.isFound': true
    });
    if (registerDoc) {
      return res
        .status(403)
        .send({ msg: 'Document was already advertised' });
    }

    const lostDoc = await FoundItem.findOne({
      documentName,
      documentNumber,
      'status.isLost': true
    }).populate('user', 'username -_id');
    if (lostDoc) {
      await FoundItem.updateOne(
        { _id: lostDoc._id },
        {
          $set: {
            'status.isFost': true,
            foundPlace: {
              district,
              sector
            },
            foundsBy: req.user._id
          }
        }
      );
      emailNotification(lostDoc);
      return res
        .status(200)
        .send({ msg: `The document was lost by ${lostDoc.user.username}` });
    }

    const foundItem = new FoundItem({
      foundsBy: req.user._id,
      status: {
        isFound: true
      },
      foundPlace: {
        district,
        sector
      },
      documentName,
      documentNumber,
      isRewarded,
      price
    });

    const found = await foundItem.save();
    return res.status(201).send(found);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
