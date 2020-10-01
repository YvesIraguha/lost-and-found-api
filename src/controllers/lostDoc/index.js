import foundItem from './foundItem';
import lostItem from './lostItem';
import deleteItem from './deleteItem';
import { allLost, allFound } from './readItem';
import updateItem from './updateItem';

const foundItemsController = {
  recordLostItem:async (req, res) => {
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
      }).populate('foundsBy', 'username -_id');
      if (foundDoc) {
        await LostItems.updateOne(
          { _id: foundDoc._id },
          {
            $set: {
              'status.isLost': true,
              lostPlace: {
                district,
                sector
              },
              user: req.user._id
            }
          }
        );
        return res
          .status(200)
          .send({ msg: `Your document was Found by ${foundDoc.foundsBy.username}` });
      }
  
      const doc = new LostItems({
        user: req.user._id,
        status: {
          isLost: true
        },
        documentName,
        documentNumber,
        lostPlace: {
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

 recordFoundItem: async (req, res) => {
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
      return res.status(403).send({ msg: 'Document was already advertised' });
    }

    const lostDoc = await FoundItem.findOne({
      documentName,
      documentNumber,
      'status.isLost': true
    }).populate('user', 'username email phoneNumber -_id');
    if (lostDoc) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = emailNotification(
        req.user.email,
        req.user.username,
        lostDoc.user.email,
        lostDoc.user.username,
        lostDoc.user.phoneNumber ? lostDoc.user.phoneNumber : null
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
            .send({ msg: `The document was lost by "${lostDoc.user.username}"\n check your email for more details` });
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
},
 
  deleteItem: async (req, res) => {
  try {
    const deleteDoc = await DeleteItem.findByIdAndDelete(req.params._id);

    if (!deleteDoc) {
      return res
        .status(404)
        .send({ error: 'No document with such Id found' });
    }

    return res
      .status(200)
      .send({
        msg: `Document with number ${deleteDoc.documentNumber} deleted successfully`,
        deleteDoc
      });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
},
  getAllLost: async (req, res) => {
  try {
    const allFoundItems = await ReadItem.find({
      'status.isFound': true
    });
    if (!allFoundItems) {
      return res
        .status(404)
        .json({ error: 'No found document registered yet' });
    }

    return res.status(200).json({ allFoundItems });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
},
getAllFound:async (req, res) => {
  try {
    const allLostItems = await ReadItem.find({
      'status.isLost': true
    });
    if (!allLostItems) {
      return res.status(404).json({ error: 'No lost document registered yet' });
    }

    return res.status(200).json({ allLostItems });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
},
 updateItem: async (req, res) => {
    const {
        documentName,
        documentNumber,
        isRewarded,
        price
    } = req.body;
    
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params._id)) {
            return res
            .status(404)
            .json({msg: 'Invalid ID'})
        }

        const registeredItem = await UpdateItem.findById(req.params._id);
                
        if (!registeredItem) { 
            return res
            .status(404)
            .json({error: 'Document not found!'})
        }

        const editedItem = registeredItem
            .set({
                documentName: documentName || registeredItem.documentName,
                documentNumber: documentNumber || registeredItem.documentNumber,
                isRewarded: isRewarded || registeredItem.isRewarded,
                price: price || registeredItem.price
            })
        
        if (isRewarded === 'false' && registeredItem.price) {
            registeredItem.set({price: '0'})
        }

        const result = await editedItem.save();
        return  res.
            status(200)
            .send({
                msg:`Document with number ${result.documentNumber} updated successfuly`, 
                result
            });
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

}

export default foundItemsController;