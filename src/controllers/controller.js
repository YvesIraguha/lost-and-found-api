import express from 'express';
import Found from '../../models/found';
import Lost from '../../models/lost';
import Delivered from '../../models/delivered';

class Controller {
    static async foundController (req, res){
       
        const found = new Found({
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
            location: req.body.location,
            requireReward: req.body.reward
        });

        //we have to search if the found documents is advertised to be lost
        const theLost = await Lost.findOne({
            $and:[{documentNumber: req.body.documentNumber}, {documentType: req.body.documentType}]
        });
        if (theLost) {
            try {
                const foundDoc = await found.save();
                res.json({msg:"Found document has advertised to be lost",
                        owner: {
                            Name: theLost.owner.fullName,
                            phoneNumber: theLost.owner.phoneNumber,
                            email: theLost.owner.email
                        }});
            } catch (error) {
                res.json(error.message);
            }
            
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