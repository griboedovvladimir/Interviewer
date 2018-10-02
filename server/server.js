const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require("mysql");
const DB_CONSTANTS = require("./constants/DB").obj;
const PATHS_CONSTANTS = require("./constants/paths").obj;
function DBconnect(DBrequest) {
    return new Promise((res, rej) => {
        let connection = sql.createConnection(DB_CONSTANTS.DB_CONFIG);
        connection.connect();
        connection.query(DBrequest, (error, results) => {
            res(results);
            rej(error)
        });
        connection.end();
    })
}

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.post(PATHS_CONSTANTS.AUTHORIZATION, (req, res) => {
    DBconnect('select * from user').then(results => {
        let response = {authorization: 'false', token: ''};
        results.forEach(i => {
            if (i.password === req.body.pass && i.name === req.body.name) {
                response = {authorization: 'true', token: i.token};
            }
        });
        res.end(JSON.stringify(response));
    });
});

app.get(PATHS_CONSTANTS.INTERVIEW, (req, res) => {
    DBconnect('select * from interview').then(results => {
        res.end(JSON.stringify(results))
    })
});

app.delete(PATHS_CONSTANTS.INTERVIEW + '/:id', (req, res) => {
    DBconnect('DELETE FROM `interview` WHERE `interview_id`=' + req.path.split('/')[2])
});

app.post(PATHS_CONSTANTS.INTERVIEW, (req, res) => {
    DBconnect('INSERT INTO `interview`(`interview_id`, `name`, `level`, `specialization`, `date`, `status`) ' +
        'VALUES (NULL,"' + req.body.name + '","' + req.body.level + '","' + req.body.specialization + '","' +
        '' + req.body.date + '","' + req.body.status + '")').then(results => {
        res.end(JSON.stringify(results.insertId))
    });
});


app.listen(4040, () => console.log('InterviewerAPI listening on port 4040!'));