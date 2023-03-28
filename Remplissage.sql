INSERT INTO Personnes (nom, prenom, estInitiateur)
VALUES ('Doe', 'John', 0),
       ('Doe', 'Jane', 0),
       ('Doe', 'Jack', 0),
       ('Doe', 'Jill', 0),
       ('Doe', 'Jenny', 1);

INSERT INTO Voies(secteur, couleur, niveau, ouveur)
VALUES (1, 'Rouge', '6a', 1),
       (2, 'Orange', '6a', 2),
       (3, 'Violet', '5c', 1),
       (4, 'Orange', '6a', 1);

INSERT INTO AFait (idPersonne, idVoie, date)
VALUES (1, 1, '2023-03-28'),
       (1, 3, '2022-12-09'),
       (2, 2, '2023-03-28');