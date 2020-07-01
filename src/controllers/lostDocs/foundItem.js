import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import FoundItem from '../../models/lost';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


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
    }).populate('user', 'username -_id email');
    if (lostDoc) {
      const msg = {
        to:`${lostDoc.user.email}`,
        from: 'habinezajanvier688@gmail.com',
        subject: 'Notification of your lost document',
        text:'This is to let you know that your document was found.'   
    };

    return sgMail
    .send(msg)
    .then(() =>{}, error =>{
        console.log(error);

        if(error.response){
            console.log(error.response.body)
        }
    });
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
