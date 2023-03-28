CREATE TABLE IF NOT EXISTS 'Personnes'
(
    'idPersonne'      INTEGER PRIMARY KEY AUTOINCREMENT,
    'numLicence'      INTEGER UNIQUE,
    'nom'    TEXT NOT NULL,
    'prenom' TEXT NOT NULL,
    'estInitiateur'   INTEGER NOT NULL DEFAULT 0 CHECK (estInitiateur IN (0, 1))
);

CREATE TABLE IF NOT EXISTS 'Voies'
(
    'idVoie'   INTEGER PRIMARY KEY AUTOINCREMENT,
    'secteur'  INTEGER NOT NULL,
    'couleur' TEXT NOT NULL,
    'niveau'  TEXT NOT NULL,
    'ouveur'  INTEGER NOT NULL,
    FOREIGN KEY(ouveur) REFERENCES Personnes(idPersonne)
);

CREATE TABLE 'AFait'
(
    'idAFait' INTEGER PRIMARY KEY AUTOINCREMENT,
    'idPersonne' INTEGER NOT NULL,
    'idVoie' INTEGER NOT NULL,
    'date' TEXT NOT NULL,
    FOREIGN KEY(idPersonne) REFERENCES Personnes(idPersonne),
    FOREIGN KEY(idVoie) REFERENCES Voies(idVoie)
);