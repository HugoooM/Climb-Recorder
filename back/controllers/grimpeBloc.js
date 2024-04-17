const GrimpeBloc = require('../models/GrimpeBloc');
const fs = require('fs');
const User = require('../models/User');
const Bloc = require('../models/Bloc');

exports.createGrimpeBloc = (req, res, next) => {
    const grimpeBlocObject = req.body;
    const grimpeBloc = new GrimpeBloc({
        grimpeur: grimpeBlocObject.grimpeur,
        voie: grimpeBlocObject.voie,
        date: grimpeBlocObject.date,
        commentaire: grimpeBlocObject.commentaire
    });

    grimpeBloc.save()
        .then(() => {
            res.status(201).json({message: 'Grimpe enregistrée !'})
        })
        .catch(error => {
            res.status(400).json({error})
        })
};

exports.getOneGrimpeBloc = (req, res, next) => {
    GrimpeBloc.findOne({
        _id: req.params.id
    })
        .then((grimpeBloc) => {
            if (!grimpeBloc) {
                return res.status(404).json({
                    error: "Grimpe non trouvée"
                });
            }
            res.status(200).json(grimpeBloc);
        })
        .catch((error) => {
            res.status(500).json({
                error: error.message
            });
        });
};

exports.modifyGrimpeBloc = (req, res, next) => {
    const grimpeBlocObject = req.file ? {
        ...JSON.parse(req.body.grimpeBloc),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    delete grimpeBlocObject._userId;
    GrimpeBloc.findOne({_id: req.params.id})
        .then((thing) => {
            if (grimpeBloc.grimpeur != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                Bloc.updateOne({_id: req.params.id}, {...grimpeBlocObject, _id: req.params.id})
                    .then(() => res.status(200).json({message: 'Objet modifié!'}))
                    .catch(error => res.status(401).json({error}));
            }
        })
        .catch((error) => {
            res.status(400).json({error});
        });
};

exports.deleteGrimpeBloc = (req, res, next) => {
    GrimpeBloc.findOne(({_id: req.params.id}))
        .then(thing => {
            if (grimpeBloc.grimpeur != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = grimpeBloc.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    GrimpeBloc.deleteOne({_id: req.params.id})
                        .then(() => {
                            res.status(200).json({message: 'Objet supprimé !'})
                        })
                        .catch(onerror => res.status(401).json({error}));
                });
            }
        })
        .catch(error => {
            res.status(500).json({error});
        })
};

exports.getAllGrimpeBloc = (req, res, next) => {
    GrimpeBloc.find().then(
        (grimpes) => {
            res.status(200).json(grimpes);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getGrimpeOfBloc = (req, res, next) => {
    GrimpeBloc.find({voie: req.params.id}).then(
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

exports.getGrimpeBlocOfUser = (req, res, next) => {
    GrimpeBloc.find({grimpeur: req.params.id})
        .populate('bloc')
        .then(
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