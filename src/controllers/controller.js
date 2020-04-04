import {Router} from 'express';
import Lost from '../../models/lost';

const router = new Router();

router.post('/lost', async (req, res)=>{
    const lost = new Lost({
        name: req.body.name,
        number: req.body.number
    });
    try {
        const lostDoc = await lost.save((err, data)=>{
            if(err) console.log(err);
        });
        res.json({msg: `Successfully added ${req.body.name}`});
    } catch (error) {
        console.log(error);
    }
});
router.get('/', async(req, res)=>{
    try {
        const findDoc = await Lost.find((err, data)=>{
            if (err) console.log(err);
        });
        res.json(findDoc);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;