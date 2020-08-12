import UpdateItem from '../../models/lost';

export default async (req, res) => {
        const {
            documentName,
            documentNumber,
            isRewarded,
            price
        } = req.body;
 try{
    const edittedItem = await UpdateItem.findById(req.params._id);
            
    if(!edittedItem) { 
        return res
        .status(404)
        .json({error: 'Document not found!'})
    }

    edittedItem
        .set({
            documentName: documentName || edittedItem.documentName,
            documentNumber: documentNumber || edittedItem.documentNumber,
            isRewarded: isRewarded || edittedItem.isRewarded,
            price: price || edittedItem.price
        })
       
    const result = await edittedItem.save();
       return  res.
        status(200)
        .send({
            msg:`Document with number ${result.documentNumber} updated successfulyy`, 
            result
        })
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}
