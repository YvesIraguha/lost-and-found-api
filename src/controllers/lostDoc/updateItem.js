import UpdateItem from '../../models/lost';
import mongoose  from 'mongoose';

export default async (req, res) => {
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

        const edittedItem = registeredItem
            .set({
                documentName: documentName || registeredItem.documentName,
                documentNumber: documentNumber || registeredItem.documentNumber,
                isRewarded: isRewarded || registeredItem.isRewarded,
                price: price || registeredItem.price
            })
        
        if (isRewarded === 'false' && registeredItem.price) {
            registeredItem.set({price: '0'})
        }

        const result = await edittedItem.save();
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
