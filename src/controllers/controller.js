import express from 'express';
import Found from '../../models/found';
import Lost from '../../models/lost';
import Delivered from '../../models/delivered';

class Controller {
    static async foundController (req, res){
        const found = new Found({
            documentType: req.body.documentType,
            documentNumber: req.body.documentNumber,
            whoFound:{
                fullName: req.body.foundName,
                phoneNumber: req.body.foundPhoneNumber
            },
            location: req.body.location,
            requireReward: req.body.reward
        });

        try {
            const foundDoc = await found.save();
            res.json(foundDoc)
        } catch (error) {
            res.json(error);
        }
    };
    static async lostController (req, res){
        const lost = new Lost({
            documentType: req.body.documentType,
            documentNumber: req.body.documentNumber,
            owner:{
                fullName: req.body.ownerName,
                phoneNumber: req.body.ownerPhoneNumber,

            },
            isRewarded: req.body.reward
        });

        try {
            const lostDoc = await lost.save();
            res.josn(lostDoc);
        } catch (error) {
            res.json(error);
        }
    };
};

export default Controller;