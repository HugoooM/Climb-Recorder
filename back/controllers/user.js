const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Thing = require("../models/Thing");
const Voie = require("../models/Voie");

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                name:req.body.name,
                firstname:req.body.firstname,
                licence : req.body.licence
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.profile=(req, res, next)=> {
    // Accéder à l'ID de l'utilisateur à partir de req.auth
    const userId = req.auth.userId;
    // Faire quelque chose avec l'ID de l'utilisateur, par exemple, rechercher les informations de l'utilisateur dans la base de données
    User.findOne({ _id: userId })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.status(200).json({ user });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

exports.getAll =(req, res, next) =>{
    User.find().then(
        (users) => {
            res.status(200).json(users);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getOneUser=(req, res, next)=>{
    User.findOne({
        _id:req.params.id
    }).then(
        (thing) =>{
            res.status(200).json(thing);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifyUserInitiateur = (req, res, next) => {
    // Construire l'objet utilisateur à mettre à jour
    const updatedUser = req.body;

    // Inverser la valeur de la propriété 'trainer'
    updatedUser.initiateur = !updatedUser.initiateur;

    // Vérifier si l'utilisateur qui effectue la modification est autorisé
    User.findOne({_id: req.params.id})
        .then((user) => {
            user.initiateur = !user.initiateur;
            user.save()
                .then(() => {
                    res.status(200).json({ message: 'Objet mis à jour avec succès', user });
                })
                .catch((error) => {
                    res.status(400).json({ error });
                });

        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};