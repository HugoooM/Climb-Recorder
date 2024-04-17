const Bloc = require('../models/Bloc');
const GrimpeBloc = require('../models/GrimpeBloc');
const fs = require('fs');
const path = require('path');

exports.createBloc = (req, res, next) => {
    const blocObject = req.body.bloc;
    var json = JSON.parse(blocObject);
    const bloc = new Bloc({
        ...json,
    });

    if (req.file) {
        bloc.imageUrl = `${req.file.filename}`;
    }


    bloc.save()
        .then(() => {
            res.status(201).json({message: 'Bloc enregistré !'})
        })
        .catch(error => {
            res.status(400).json({error})
        })
};

exports.getOneBloc = (req, res, next) => {
    Bloc.findOne({
        _id: req.params.id
    }).then(
        (thing) => {
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

exports.modifyBloc = (req, res, next) => {
    const blocObject = req.file ? {
        ...JSON.parse(req.body.bloc),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    delete blocObject._userId;
    Bloc.findOne({_id: req.params.id})
        .then((thing) => {
            if (bloc.ouvreur != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                Bloc.updateOne({_id: req.params.id}, {...blocObject, _id: req.params.id})
                    .then(() => res.status(200).json({message: 'Objet modifié!'}))
                    .catch(error => res.status(401).json({error}));
            }
        })
        .catch((error) => {
            res.status(400).json({error});
        });
};

exports.deleteBloc = (req, res, next) => {
    const userId = req.body.user;

    Bloc.findOne({_id: req.params.id})
        .then(bloc => {
            if (!bloc) {
                return res.status(404).json({message: "Bloc non trouvée"});
            }

            if (bloc.ouvreur.toString() !== userId) {
                return res.status(403).json({message: "Non autorisé à supprimer ce bloc."});
            }

            GrimpeBloc.deleteMany({voie: req.params.id})
                .then(() => {
                    if (bloc.imageUrl) {
                        const imagePath = path.join(__dirname, `../../front/images/${bloc.imageUrl}`);
                        fs.unlink(imagePath, (err) => {
                            if (err) {
                                console.error("Erreur lors de la suppression du fichier image :", err);
                            }
                        });
                    }
                    Bloc.deleteOne({_id: req.params.id})
                        .then(() => {
                            res.status(200).json({message: "Bloc supprimé avec succès"});
                        })
                        .catch(error => {
                            res.status(500).json({error: error.message});
                        });
                })

        })
        .catch(error => {
            res.status(500).json({error: error.message});
        });
};

exports.getAllBloc = (req, res, next) => {
    Bloc.find().then(
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