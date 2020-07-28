import ReadItem from '../../models/lost';

export const allFound = async(req, res) =>{
    try{
        const allFoundItems = await ReadItem.find({
            'status.isFound': true
        });
        if(!allFoundItems) return res.status(400).json({error: 'No found document in DB yet'});

        return res.status(200).json({allFoundItems});
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

export const allLost = async(req, res) =>{
    try{
        const allLostItems = await ReadItem.find({
            'status.isLost': true
        });
        if(!allLostItems) return res.status(400).json({error: 'No document in DB yet'});

        return res.status(200).json({allLostItems});
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}