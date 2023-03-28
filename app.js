const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

const db = new sqlite3.Database('./identifier.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the mydb database.');
});


app.get('/personnes', (req, res) => {
    const sql = 'SELECT * FROM Personnes';
    db.all(sql, [], (err, rows) => {
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
