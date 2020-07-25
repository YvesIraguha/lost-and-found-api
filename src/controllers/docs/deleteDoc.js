import Docs from '../../models/lost';

export default async (req, res) =>{
    try{
        const doc = await Docs.findByIdAndDelete(req.params._id)

        return res.status(200).send({msg:`Document with number ${doc.documentNumber} deleted successfully`, doc});
    }catch(error){
        return res.status(400).send({error: 'No document with such Id found'});
    }
}