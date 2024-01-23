const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
app.use(cors());

const db = new sqlite3.Database('./climb.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the climb database.');
});

//Obtenir toutes les personnes
app.get('/personnes', (req, res) => {
    const sql = 'SELECT * FROM Personnes';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

//Ajouter une personne à la base de données
app.get('/personnes/add/:numLicence/:nom/:prenom', (req, res) => {
    const sql = 'INSERT INTO Personnes (numLicence, nom, prenom, estInitiateur) VALUES (?, ?, ?, 0)';
    db.get(sql, [req.params.numLicence, req.params.nom, req.params.prenom], (err, row) => {
        if (err) {
            throw err;
        }
        res.send(row);
    });
});

//Obtenir les informations d'une personne
app.get('/personnes/:id', (req, res) => {
    const sql = 'SELECT * FROM Personnes WHERE idPersonne = ?';
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            throw err;
        }
        res.send(row);
    });
});

//Switch l'état initiateur d'une personne
app.get('/personnes/switchInitiateur/:id', (req, res) => {
    const sql = 'UPDATE Personnes SET estInitiateur = NOT estInitiateur WHERE idPersonne = ?';
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            throw err;
        }
        res.send(row);
    });
});

//Supprimer une personne de la base de données
app.get('/personnes/remove/:id', (req, res) => {
    const sql = 'DELETE FROM Personnes WHERE idPersonne = ?';
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            throw err;
        }
        res.send(row);
    });

    const sql2 = 'DELETE FROM AFait WHERE idPersonne = ?';
    db.get(sql2, [req.params.id], (err, row) => {
        if (err) {
            throw err;
        }
        res.send(row);
    });

    const sql3 = 'DELETE FROM Voies WHERE ouvreur = ?';
    db.get(sql3, [req.params.id], (err, row) => {
        if (err) {
            throw err;
        }
        res.send(row);
    });
});

//Obtenir toutes les voies
app.get('/voies', (req, res) => {
    const sql = 'SELECT Voies.*, Personnes.nom, Personnes.prenom FROM Personnes, Voies WHERE ' +
        'Personnes.idPersonne = Voies.ouvreur';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

//Supprimer une voie de la base de données
app.get('/voies/remove/:id', (req, res) => {
    const sql = 'UPDATE Voies SET estOuverte = 0 WHERE idVoie = ?';
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            throw err;
        }
        res.send(row);
    });
});

//Ajouter une voie à la base de données
app.get('/voies/add/:secteur/:couleur/:niveau/:ouvreur', (req, res) => {
    const sql = 'INSERT INTO Voies (secteur, couleur, niveau, ouvreur, estOuverte) VALUES (?, ?, ?, ?, 1)';
    db.get(sql, [req.params.secteur, req.params.couleur, req.params.niveau, req.params.ouvreur], (err, row) => {
        if (err) {
            throw err;
        }
        res.send(row);
    });
});

//Obtenir toutes les voies ouvertes
app.get('/voies/ouvertes', (req, res) => {
    const sql = 'SELECT Voies.*, Personnes.nom, Personnes.prenom FROM Personnes, Voies WHERE Voies.estOuverte = 1 AND ' +
        'Personnes.idPersonne = Voies.ouvreur';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

//Obtenir les informations d'une voie
app.get('/voies/:id', (req, res) => {
    const sql = 'SELECT Voies.*, Personnes.nom, Personnes.prenom FROM Personnes, Voies WHERE ' +
        'Personnes.idPersonne = Voies.ouvreur AND Voies.idVoie = ?';
    db.get(sql, [req.params.id], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

//Obtenir les voies réalisées par une personne
app.get('/voies/realisees/:id', (req, res) => {
    const sql = 'SELECT AFait.*, Voies.*' +
        'FROM AFait, Voies WHERE AFait.idVoie = Voies.idVoie AND AFait.idPersonne = ?';
    db.all(sql, [req.params.id], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

//Marque une voie comme réalisée
app.get('/voies/faite/:idVoie/:idPersonne', (req, res) =>{
    const sql = 'INSERT INTO AFait (idPersonne, idVoie, date) VALUES (?, ?, ?)';
    const date = new Date();
    var annee = date.getFullYear();
    var mois = (date.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0
    var jour = date.getDate().toString().padStart(2, '0');

    let stringDate = annee + "-" + mois + "-" + jour;

    db.get(sql, [req.params.idPersonne, req.params.idVoie, stringDate], (err, row) => {
        if (err) {
            throw err;
        }
        res.send(row);
    });
})

//Obtenir les 5 dernières voies réalisées par une personne
app.get('/voies/dernieres/:id', (req, res) => {
    const sql = 'SELECT AFait.*, Voies.secteur, Voies.couleur, Voies.niveau ' +
        'FROM AFait, Voies WHERE AFait.idVoie = Voies.idVoie AND AFait.idPersonne = ? LIMIT 5';
    db.all(sql, [req.params.id], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });

});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
