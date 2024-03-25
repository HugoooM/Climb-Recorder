const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const grimpeCtrl = require('../controllers/grimpe');

router.get('/', auth, grimpeCtrl.getAllGrimpe);
router.post('/', auth, grimpeCtrl.createGrimpe);
router.get('/:id', auth, grimpeCtrl.getOneGrimpe);
router.get('/voie/:id', auth, grimpeCtrl.getGrimpeOfVoie);
router.get('/user/:id', auth, grimpeCtrl.getGrimpeOfUser);
router.put('/:id', auth, grimpeCtrl.modifyGrimpe);
router.delete('/:id', auth, grimpeCtrl.deleteGrimpe);

module.exports = router;