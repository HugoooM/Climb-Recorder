const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const voieCtrl = require('../controllers/voie');

router.get('/', auth, voieCtrl.getAllVoie);
router.post('/', auth, multer, voieCtrl.createVoie);
router.get('/:id', auth, voieCtrl.getOneVoie);
router.put('/:id', auth, multer, voieCtrl.modifyVoie);
router.delete('/:id', auth, voieCtrl.deleteVoie);

module.exports = router;