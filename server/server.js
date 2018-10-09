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
    DBconnect('select * from interview ORDER BY interview_id DESC').then(results => {
        res.end(JSON.stringify(results))
    })
});

app.delete(PATHS_CONSTANTS.INTERVIEW + '/:id', (req, res) => {
    DBconnect('DELETE FROM `interview` WHERE `interview_id`=' + req.params.id)
});

app.post(PATHS_CONSTANTS.INTERVIEW, (req, res) => {
    DBconnect('INSERT INTO `interview`(`interview_id`, `name`, `level`, `specialization`, `date`, `status`) ' +
        'VALUES (NULL,"' + req.body.name + '","' + req.body.level + '","' + req.body.specialization + '","' +
        '' + req.body.date + '","' + req.body.status + '")').then(results => {
        res.end(JSON.stringify(results.insertId))
    });
});

app.post(PATHS_CONSTANTS.QUESTION_CARD, (req, res) => {
    DBconnect('INSERT INTO `question_card`(`question_card_id`, `interview_id`, `mark`, `comment`, `question_id`, `topic_name`) ' +
        'VALUES (NULL,' + Number(req.body.interviewId) + ',"' + req.body.mark + '","' + req.body.comment + '",' + req.body.questionId + ',"' + req.body.topic + '")').then(result => {
        res.end('ok')
    })
});

app.put(PATHS_CONSTANTS.QUESTION_CARD, (req, res) => {
    DBconnect('UPDATE `question_card` SET `mark`="' + req.body.mark + '",`comment`="' + req.body.comment + '" WHERE `question_card_id`=' + req.body.question_card_id + '')
        .then();
});

app.get(PATHS_CONSTANTS.QUESTION, (req, res) => {
    DBconnect('SELECT* from `question`, `subtopic`,`topic` ' +
        'WHERE question.subtopic_id = subtopic.subtopic_id ' +
        'AND topic.topic_id = subtopic.topic_id AND topic.name="' + req.query.id + '"').then(results => {
        let data = {...results[req.query.question.toString()], total: results.length};
        res.end(JSON.stringify(data));
    });
});

app.post(PATHS_CONSTANTS.QUESTION_CARD_CHECK, (req, res) => {
    DBconnect('SELECT* from `question_card` WHERE  interview_id='
        + req.body.interviewId + ' AND question_id=' + req.body.questionId + '')
        .then(result => {
            res.end(JSON.stringify(result));
        }).catch(error => {
        res.end(JSON.stringify(''));
    })
});

app.listen(4000, () => console.log('InterviewerAPI listening on port 4040!'));