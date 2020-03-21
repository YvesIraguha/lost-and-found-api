import LostDocuments from '../../models/found';
import Lost from '../../models/lost';
import Delivered from '../../models/delivered';


class Controller {
    static async foundController (req, res){
       
        const found = new LostDocuments({
            documentType: req.body.documentType,
            documentNumber: req.body.documentNumber,
            owner:{
                fullName: req.body.ownerName,
                phoneNumber: req.body.ownerPhoneNumber,
            },
            whoFound:{
                fullName: req.body.foundName,
                phoneNumber: req.body.foundPhoneNumber
            },
            status: {
                isFound: true,
            },
            location: req.body.location,
            requireReward: req.body.reward
        });

        //we have to search if the found documents is advertised to be lost
        const theLost = await LostDocuments.findOne({
            $and:[
                {documentNumber: req.body.documentNumber},
                {documentType: req.body.documentType},
                {'status.isLost':true}
            ]
        });
        
        //updating the lost document to be found or saving a new found document
        if (theLost) {
            const update = await LostDocuments.updateOne({_id: theLost._id}, 
                {$set: {'status.isFound':true}});
            res.json({ 
                msg:"This document has advertised to be lost",
                owner: {
                    Name: theLost.owner.fullName,
                    phoneNumber: theLost.owner.phoneNumber,
                    email: theLost.owner.email
                }
            });
        }
        else{
            try {
                const foundDoc = await found.save();
                res.json(foundDoc)
            } catch (error) {
                res.json(error.message);
            }
        }
        
    };
    static async lostController (req, res){
        const lost = new Lost({
            documentType: req.body.documentType,
            documentNumber: req.body.documentNumber,
            owner:{
                fullName: req.body.ownerName,
                phoneNumber: req.body.ownerPhoneNumber,
                email: req.body.ownerEmail
            },
            isRewarded: req.body.reward
        });

        try {
            const lostDoc = await lost.save();
            res.json(lostDoc);
        } catch (error) {
            res.json(error.message);
        }
    };
};

export default Controller;