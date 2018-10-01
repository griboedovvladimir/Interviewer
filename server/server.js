const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require("mysql");
const DB_CONSTANTS = require("./constants/DB").obj;
const PATHS_CONSTANTS = require("./constants/paths").obj;

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post(PATHS_CONSTANTS.AUTHORIZATION, (req, res) => {
    let connection = sql.createConnection(DB_CONSTANTS.DB_CONFIG);
    connection.connect();
    connection.query('select * from user', (error, results) => {
        let response = 'false';
        results.forEach(i => {
            if (i.password === req.body.pass && i.name === req.body.name) {
                response = 'true';
            }
        });
        res.end(response);
    });
    connection.end();
});

app.get(PATHS_CONSTANTS.INTERVIEW, (req, res) => {
    let connection = sql.createConnection(DB_CONSTANTS.DB_CONFIG);
    connection.connect();
    connection.query('select * from interview', (error, results)=> {
        res.end(JSON.stringify(results));
    });
    connection.end();
});

app.delete(PATHS_CONSTANTS.INTERVIEW + '/:id',  (req, res) => {
    let connection = sql.createConnection(DB_CONSTANTS.DB_CONFIG);
    connection.connect();
    connection.query('DELETE FROM `interview` WHERE `interview_id`='+req.path.split('/')[2]);
    connection.end();
});

app.post(PATHS_CONSTANTS.INTERVIEW, (req, res) => {
    let connection = sql.createConnection(DB_CONSTANTS.DB_CONFIG);
    connection.connect();
    connection.query(
        'INSERT INTO `interview`(`interview_id`, `name`, `level`, `specialization`, `date`, `status`) ' +
        'VALUES (NULL,"'+ req.body.name +'","'+req.body.level+'","'+req.body.specialization+'","' +
        ''+req.body.date+'","'+req.body.status+'")',(error, results, fields)=>{
            res.end(JSON.stringify(results.insertId));
        }
    );
    connection.end();
});



app.listen(4040, () => console.log('Gator app listening on port 4040!'));