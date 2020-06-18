import { FoundItem, validate } from '../../models/found';

export default async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const foundItem = new FoundItem({
    docName: req.body.docName,
    district: req.body.district,
    sector: req.body.sector,
    description: req.body.description,
    category: req.body.category,
    isRewarded: req.body.isRewarded,
    price: req.body.price
  });
  const found = await foundItem.save();
  return res.send(found);
};
