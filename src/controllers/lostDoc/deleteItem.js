import DeleteItem from '../../models/lost';

export default async (req, res) =>{
    try{
        const deleteDoc = await DeleteItem.findByIdAndDelete(req.params._id)

        return res.status(200).send({msg:`Document with number ${deleteDoc.documentNumber} deleted successfully`, doc});
    }catch(error){
        return res.status(400).send({error: 'No document with such Id found'});
    }
}