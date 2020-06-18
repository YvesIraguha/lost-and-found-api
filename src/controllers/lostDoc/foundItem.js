import FoundItem from '../../models/lost';

export default async (req, res) => {
  try {
    const registerDoc = await FoundItem.findOne({
    documentName:req.body.documentName,
    documentNumber:req.body.documentNumber,
    'status.isFound': true
  });
  if(registerDoc) return res.status(403).send({msg: 'Document was already advertised'});
  
 
  const lostDoc = await FoundItem.findOne({
    documentName:req.body.documentName,
    documentNumber:req.body.documentNumber,
    'status.isLost':true
  })
  if(lostDoc) return res.status(200).send({msg: 'The document was lost'});
  
 
  const foundItem = new FoundItem({
    user: req.user._id,
    status:{
      isFound:true
    },
    foundPlace:{
      district: req.body.district,
      sector: req.body.sector
    },
    documentName: req.body.documentName,
    documentNumber: req.body.documentNumber,
    isRewarded: req.body.isRewarded,
    price: req.body.price
  });

  const found = await foundItem.save();
  return res.status(201).send(found);
} catch(error) {
  return res.status(400).send({error: error.message});
}
};
