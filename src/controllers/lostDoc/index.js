import sgMail from '@sendgrid/mail';
import models from '../../models/index';
import emailNotification from '../../helpers/sendEmail';

const { LostItems: Item } = models;

const itemController = {
  recordLostItem: async (req, res) => {
    try {
      const { documentTitle, documentID, location, reward, status } = req.body;
      const adDoc = await Item.findOne({
        documentTitle,
        documentID,
        status: 'lost'
      });

      if (adDoc) {
        return res
          .status(403)
          .send({ msg: 'Your document was advertised before' });
      }

      const foundDoc = await Item.findOne({
        documentTitle,
        documentID,
        status: 'found'
      }).populate('foundsBy', 'username -_id');
      if (foundDoc) {
        await Item.updateOne(
          { _id: foundDoc._id },
          {
            $set: {
              status: 'lost',
              location,
              user: req.user._id
            }
          }
        );

        return res.status(201).send({
          msg: `Your document was Found by ${foundDoc.foundsBy.username}`
        });
      }

      const doc = new Item({
        user: req.user._id,
        status,
        documentTitle,
        documentID,
        location,
        reward
      });

      const newDoc = await doc.save();
      return res.status(201).send({ newDoc });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },

  recordFoundItem: async (req, res) => {
    try {
      const { documentTitle, documentID, location, reward, status } = req.body;

      const registerDoc = await Item.findOne({
        documentTitle,
        documentID,
        status: 'found'
      });
      if (registerDoc) {
        return res.status(403).send({ msg: 'Document was already advertised' });
      }

      const lostDoc = await Item.findOne({
        documentTitle,
        documentID,
        status: 'lost'
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
            await Item.updateOne(
              { _id: lostDoc._id },
              {
                $set: {
                  status: 'found',
                  location,
                  foundsBy: req.user._id
                }
              }
            );
            return res.status(201).send({
              msg: `The document was lost by "${lostDoc.user.username}"\n check your email for more details`
            });
          })
          .catch((error) => {
            res.status(500).send({ err: error.message });
          });
      } else {
        const foundItem = new Item({
          foundsBy: req.user._id,
          status,
          location,
          documentTitle,
          documentID,
          reward
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
      const deleteDoc = await Item.findByIdAndDelete(req.params._id);

      if (!deleteDoc) {
        return res
          .status(404)
          .send({ error: 'No document with such Id found' });
      }

      return res.status(201).send({
        msg: `Document with number ${deleteDoc.documentID} deleted successfully`,
        deleteDoc
      });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  getAllLost: async (req, res) => {
    try {
      const allFoundItems = await Item.find({
        status: 'found'
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

  getAllFound: async (req, res) => {
    try {
      const allLostItems = await Item.find({
        status: 'lost'
      });
      if (!allLostItems) {
        return res
          .status(404)
          .json({ error: 'No lost document registered yet' });
      }

      return res.status(200).json({ allLostItems });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  getItem: async (req, res) => {
    try {
      const { _id } = req.params;
      const lostItem = await Item.findOne({
        _id
      });
      if (!lostItem) {
        return res.status(404).json({ error: 'Not document with that Id' });
      }
      return res.status(200).json({ lostItem });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  updateItem: async (req, res) => {
    try {
      const registeredItem = await Item.findById(req.params._id);
      const editedItem = registeredItem.set({
        ...req.body
      });
      const result = await editedItem.save();
      return res.status(201).send({
        msg: `Document with number ${result.documentID} updated successfully`,
        result
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};

export default itemController;
