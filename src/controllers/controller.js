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
            if(err) res.status(501).json({msg: 'failed to save '})
        });
        res.json({msg: `Successfully added ${req.body.name}`});
    } catch (error) {
        res.status(500).json({msg: 'internal error, try again'})
    }
});
router.get('/', async(req, res)=>{
    try {
        const findDoc = await Lost.find((err, data)=>{
            if (err) res.status(501).json({msg: 'failed to fetch the data'});
        });
        res.json(findDoc);
    } catch (error) {
        res.status(500).json({msg: 'internal error, try again'});
    }
})

module.exports = router;