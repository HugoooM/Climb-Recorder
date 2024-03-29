const Voie = require('../models/Voie');
const Grimpe = require('../models/Grimpe');
const fs = require('fs');
const path = require('path');

exports.createVoie = (req, res, next) => {
    const voieObject = req.body.voie;
    var json = JSON.parse(voieObject);
    const voie = new Voie({
        ...json,
    });

    if (req.file) {
        voie.imageUrl = `${req.file.filename}`;
    }


    voie.save()
        .then(() => {res.status(201).json({message:'Voie enregistrée !'})})
        .catch(error => {res.status(400).json({error})})
};

exports.getOneVoie = (req, res, next) =>{
    Voie.findOne({
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

exports.modifyVoie = (req, res, next) => {
    const voieObject = req.file ? {
        ...JSON.parse(req.body.voie),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete voieObject._userId;
    Voie.findOne({_id: req.params.id})
        .then((thing) => {
            if (voie.ouvreur != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Voie.updateOne({ _id: req.params.id}, { ...voieObject, _id: req.params.id})
                    .then(() => res.status(200).json({message : 'Objet modifié!'}))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteVoie = (req, res, next) => {
    const userId = req.body.user;

    Voie.findOne({_id: req.params.id})
        .then(voie => {
            if (!voie) {
                return res.status(404).json({message: "Voie non trouvée"});
            }

            if (voie.ouvreur.toString() !== userId) {
                return res.status(403).json({message: "Non autorisé à supprimer cette voie"});
            }

            if (voie.imageUrl) {
                const imagePath = path.join(__dirname, `../../front/images/${voie.imageUrl}`);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error("Erreur lors de la suppression du fichier image :", err);
                    }
                });
            }

            Voie.deleteOne({_id: req.params.id})
                .then(() => {
                    res.status(200).json({message: "Voie supprimée avec succès"});
                })
                .catch(error => {
                    res.status(500).json({error: error.message});
                });
        })
        .catch(error => {
            res.status(500).json({error: error.message});
        });
};

exports.getAllVoie = (req, res, next) => {
    Voie.find().then(
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