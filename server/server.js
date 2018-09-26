const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require("mysql");
const DB_config = {
    user: 'admin',
    password: 'MP1257723',
    server: 'localhost',
    port: 3306,
    database: 'interviewer'
};


app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.post('/authorization', (req, res) => {
    let connection = sql.createConnection(DB_config);
    connection.connect();
    connection.query('select * from User', function (error, results, fields) {
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


app.listen(4040, () => console.log('Gator app listening on port 4040!'));