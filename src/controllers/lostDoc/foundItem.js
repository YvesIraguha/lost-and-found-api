import sgMail from '@sendgrid/mail';
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
    }).populate('user', 'username email phoneNumber -_id');
    if (lostDoc) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = emailNotification(
        req.user.username, lostDoc.user.username, lostDoc.user.email, lostDoc.user.phoneNumber
      );
      sgMail
        .send(msg)
        .then(async () => {
          await FoundItem.updateOne(
            { _id: lostDoc._id },
            {
              $set: {
                'status.isFound': true,
                foundPlace: {
                  district,
                  sector
                },
                foundsBy: req.user._id
              }
            }
          );
          return res
            .status(200)
            .send({ msg: `The document was lost by ${lostDoc.user.username}` });
        })
        .catch((error) => {
          res.status(500).send({ err: error.message });
        });
    } else {
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
    }
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
