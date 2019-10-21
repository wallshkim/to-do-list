const express = require('express');
const router = express.Router();

// DATABASE CONNECTION
const pool = require('../modules/pool.js');


// GET
router.get('/', (req, res) => {
    const query = 'SELECT * FROM tasks ORDER BY "id";';

    pool.query(query).then((results) => {
        console.log(results);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error with GET', error);
        res.sendStatus(500);
    });
}); // END GET ROUTE


// POST
router.post('/', (req, res) => {
    const query = `INSERT INTO "tasks" ("task")
    VALUES($1);`;

    const values = [req.body.task];

    pool.query(query, values)
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error with INSERT', error);
            res.sendStatus(500);
        });
}); // END POST ROUTE


// PUT
router.put('/:id', (req, res) => {
    const query = `UPDATE "tasks" SET "completed" = $1
    WHERE "id" = $2;`;

    const values = [req.body.newStatus, req.params.id];

    pool.query(query, values).then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error with UPDATE`, error);
        res.sendStatus(500);
    });
}); // END PUT ROUTE


// DELETE
router.delete('/:id', (req, res) => {
    const query = `DELETE FROM "tasks"
    WHERE "id" = $1;`;

    const values = [req.params.id];

    pool.query(query, values)
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error with DELETE', error);
            res.sendStatus(500);
        });
}); // END DELETE ROUTE


module.exports = router;