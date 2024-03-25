const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require("../middleware/auth");

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profile', auth, userCtrl.profile);
router.get('/get', auth, userCtrl.getAll);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/initiateur/:id', auth, userCtrl.modifyUserInitiateur);

module.exports = router;