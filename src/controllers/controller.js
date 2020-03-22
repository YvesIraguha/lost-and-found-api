import LostDocuments from '../../models/lostAndFound';


class Controller {
    static async foundController (req, res){
       
        const found = new LostDocuments({
            documentType: req.body.documentType,
            documentNumber: req.body.documentNumber,
            owner:{
                fullName: req.body.ownerName,
                phoneNumber: req.body.ownerPhoneNumber,
                email: req.body.ownerEmail
            },
            whoFound:{
                fullName: req.body.foundName,
                phoneNumber: req.body.foundPhoneNumber,
                email: req.body.foundEmail
            },
            status: {
                isFound: true,
            },
            location: {
                pickingPlace: req.body.location
            },
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
                {$set: {'status.isFound':true, 'location.pickingPlace':req.body.location}});
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
        const lost = new LostDocuments({
            documentType: req.body.documentType,
            documentNumber: req.body.documentNumber,
            owner:{
                fullName: req.body.ownerName,
                phoneNumber: req.body.ownerPhoneNumber,
                email: req.body.ownerEmail
            },
            whoFound:{
                fullName: req.body.foundName,
                phoneNumber: req.body.foundPhoneNumber,
                email: req.body.foundEmail
            },
            status: {
                isLost: true,
            },
            location: {
                lostPlace: req.body.location
            },
            requireReward: req.body.reward
        });

        //checking if the lost documents has found before
        const theFound = await LostDocuments.findOne({
            $and: [
                {documentNumber: req.body.documentNumber},
                {documentType: req.body.documentType},
                {'status.isFound':true}
            ]
        });

        //if the document is found before or to save a lost document
        if (theFound) {
            try {
                const update = await LostDocuments.updateOne({_id: theFound._id}, 
                    {$set: {'status.isLost':true, 'location.lostPlace':req.body.location}});
    
                res.json({
                    msg: `Your ${theFound.documentType} has found by:`,
                    whoFoundIt: {
                        Name: theFound.whoFound.fullName,
                        phoneNumber: theFound.whoFound.phoneNumber,
                        email: theFound.whoFound.email
                    }
    
                }); 
            } catch (error) {
                res.json(error.message);
            } 
        }
        else{
            try {
                const lostDoc = await lost.save();
                res.json(lostDoc);
            } catch (error) {
                res.json(error.message);
            }
        };
    };

    static async lostAndfoundDoc (req, res) {
        const lost_found = await LostDocuments.find({
            $and: [
                {'status.isLost':true},
                {'status.isFound':true}
            ]
        })
        .select({_id:0, __v:0, status:0});
        try {
            res.json(lost_found)
        } catch (error) {
            res.json(error.message)
        }
    }   
};

export default Controller;