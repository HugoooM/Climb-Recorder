const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Thing = require('./models/Thing');
const Voie = require('./models/Voie');
const voieRoutes = require('./routes/voie');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const grimpeRoutes = require('./routes/grimpe');
const path = require('path');

// URL de connexion à la base de données locale
const uri = 'mongodb://localhost:27017/climb_recorder';

mongoose.connect(uri)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

/*
Permet au 2 servers de communiquer entre eux (front et back)
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRoutes);
app.use('/api/voies', voieRoutes);
app.use('/api/grimpe', grimpeRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;