import {Router} from 'express';
import Controller from '../controllers/controller';

const router = new Router;

router.route('/found').post(Controller.foundController);
router.route('/lost').post(Controller.lostController);

module.exports = router;