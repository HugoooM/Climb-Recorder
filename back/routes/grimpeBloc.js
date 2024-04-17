const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const grimpeBlocCtrl = require('../controllers/grimpeBloc');

router.get('/', auth, grimpeBlocCtrl.getAllGrimpeBloc);
router.post('/', auth, grimpeBlocCtrl.createGrimpeBloc);
router.get('/:id', auth, grimpeBlocCtrl.getOneGrimpeBloc);
router.get('/bloc/:id', auth, grimpeBlocCtrl.getGrimpeOfBloc);
router.get('/user/:id', auth, grimpeBlocCtrl.getGrimpeBlocOfUser);
router.put('/:id', auth, grimpeBlocCtrl.modifyGrimpeBloc);
router.delete('/:id', auth, grimpeBlocCtrl.deleteGrimpeBloc);

module.exports = router;