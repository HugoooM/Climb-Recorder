const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const blocCtrl = require('../controllers/bloc');

router.get('/', auth, blocCtrl.getAllBloc);
router.post('/', auth, multer, blocCtrl.createBloc);
router.get('/:id', auth, blocCtrl.getOneBloc);
router.put('/:id', auth, multer, blocCtrl.modifyBloc);
router.delete('/:id', auth, blocCtrl.deleteBloc);

module.exports = router;