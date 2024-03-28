const Voie = require('../models/Voie');
const fs = require('fs');

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
    Voie.findOne(({_id: req.params.id}))
        .then(thing => {
            if (voie.ouvreur != req.auth.userId){
                res.status(401).json({message:'Not authorized'});
            } else{
                const filename = voie.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Voie.deleteOne({_id:req.params.id})
                        .then(() => {res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(onerror => res.status(401).json({error}));
                });
            }
        })
        .catch(error => {
            res.status(500).json({error});
        })
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