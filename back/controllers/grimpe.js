const Grimpe = require('../models/Grimpe');
const fs = require('fs');
const User = require('../models/User');
const Voie = require('../models/Voie');

exports.createGrimpe = (req, res, next) => {
    const grimpeObject = req.body;
    const grimpe = new Grimpe({
        grimpeur: grimpeObject.grimpeur,
        voie: grimpeObject.voie,
        date: grimpeObject.date,
        commentaire: grimpeObject.commentaire
    });

    grimpe.save()
        .then(() => {
            res.status(201).json({message: 'Grimpe enregistrée !'})
        })
        .catch(error => {
            res.status(400).json({error})
        })
};

exports.getOneGrimpe = (req, res, next) => {
    Grimpe.findOne({
        _id: req.params.id
    })
        .then((grimpe) => {
            if (!grimpe) {
                return res.status(404).json({
                    error: "Grimpe not found"
                });
            }
            res.status(200).json(grimpe);
        })
        .catch((error) => {
            res.status(500).json({
                error: error.message
            });
        });
};

exports.modifyGrimpe = (req, res, next) => {
    const grimpeObject = req.file ? {
        ...JSON.parse(req.body.grimpe),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    delete grimpeObject._userId;
    Grimpe.findOne({_id: req.params.id})
        .then((thing) => {
            if (grimpe.grimpeur != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                Voie.updateOne({_id: req.params.id}, {...grimpeObject, _id: req.params.id})
                    .then(() => res.status(200).json({message: 'Objet modifié!'}))
                    .catch(error => res.status(401).json({error}));
            }
        })
        .catch((error) => {
            res.status(400).json({error});
        });
};

exports.deleteGrimpe = (req, res, next) => {
    Grimpe.findOne(({_id: req.params.id}))
        .then(thing => {
            if (grimpe.grimpeur != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = grimpe.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Grimpe.deleteOne({_id: req.params.id})
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

exports.getAllGrimpe = (req, res, next) => {
    Grimpe.find().then(
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

exports.getGrimpeOfVoie = (req, res, next) => {
    Grimpe.find({voie: req.params.id}).then(
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

exports.getGrimpeOfUser = (req, res, next) => {
    Grimpe.find({grimpeur: req.params.id})
        .populate('voie')
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