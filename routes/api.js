var express = require('express');
var router = express.Router();
/*開啟資料庫*/
const sqlite = require('sqlite3').verbose();
db = new sqlite.Database("./db.sqlite", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});
/*post*/
router.post('/', (req, res) => {
    const {name, year, month, price}=req.body;
    sql = "INSERT INTO crop (name, year, month, price) VALUES (?, ?, ?, ?)";
    db.run(sql, [name, year, month, price], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        res.redirect('/gdata.html');
        //console.log('inserted');
    });
})
/*get*/
router.get('/', function(req, res, next) {
    sql= "SELECT * FROM crop";
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});
module.exports = router;
