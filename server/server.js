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
    DBconnect('INSERT INTO `interview`(`interview_id`, `name`, `level`, `specialization`, `date`, `status`, `interviewee_id`) ' +
        'VALUES (NULL,"' + req.body.name + '","' + req.body.level + '","' + req.body.specialization + '","' +
        '' + req.body.date + '","' + req.body.status + '", 0)').then(results => {
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

app.get(PATHS_CONSTANTS.QUESTION_CARDS + '/:id', (req, res) => {
    DBconnect('SELECT* from `question_card` WHERE `interview_id`=' + req.params.id + '').then(results => {
        res.end(JSON.stringify(results));
    });
});

app.get(PATHS_CONSTANTS.QUESTION_BY_ID + '/:id', (req, res) => {
    DBconnect('SELECT* from `question` WHERE `question_id`=' + req.params.id + '').then(results => {
        res.end(JSON.stringify(results));
    });
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

app.post(PATHS_CONSTANTS.RIGHTS_CHECK, (req, res) => {
    DBconnect('SELECT * FROM `user` WHERE token = "' + req.body.token + '" AND rights = "admin" ').then(result => {
        if (!!result.length) {
            res.end(JSON.stringify(true));
        }
        else {
            res.end(JSON.stringify(false));
        }
    }).catch(result => {
        res.end(JSON.stringify(false));
    })
});

app.get(PATHS_CONSTANTS.SEND_EMAIL_PATH + '/:id', (req, res) => {
    setTimeout(() => {
        res.end(JSON.stringify(true))
    }, 2000);

});

/*------------------- EXCEL GENERATOR ------------------------*/

const excel = require('node-excel-export');

app.post(PATHS_CONSTANTS.GET_EXCEL_PATH, (req, res) => {

    console.log(req.body.interviewId);
// You can define styles as json object
    const styles = {
        headerDark: {
            fill: {
                fgColor: {
                    rgb: 'FF000000'
                }
            },
            font: {
                color: {
                    rgb: 'FFFFFFFF'
                },
                sz: 14,
                bold: true,
                underline: true
            }
        },
        cellPink: {
            fill: {
                fgColor: {
                    rgb: 'FFFFCCFF'
                }
            }
        },
        cellGreen: {
            fill: {
                fgColor: {
                    rgb: 'FF00FF00'
                }
            }
        }
    };

//Array of objects representing heading rows (very top)
    const heading = [
        [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {
            value: 'c1',
            style: styles.headerDark
        }],
        ['a2', 'b2', 'c2'] // <-- It can be only values
    ];

//Here you specify the export structure
    const specification = {
        customer_name: { // <- the key should match the actual data key
            displayName: 'Customer', // <- Here you specify the column header
            headerStyle: styles.headerDark, // <- Header style
            cellStyle: function (value, row) { // <- style renderer function
                // if the status is 1 then color in green else color in red
                // Notice how we use another cell value to style the current one
                return (row.status_id === 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible
            },
            width: 120 // <- width in pixels
        },
        status_id: {
            displayName: 'Status',
            headerStyle: styles.headerDark,
            cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property
                return (value === 1) ? 'Active' : 'Inactive';
            },
            width: '10' // <- width in chars (when the number is passed as string)
        },
        note: {
            displayName: 'Description',
            headerStyle: styles.headerDark,
            cellStyle: styles.cellPink, // <- Cell style
            width: 220 // <- width in pixels
        }
    };

// The data set should have the following shape (Array of Objects)
// The order of the keys is irrelevant, it is also irrelevant if the
// dataset contains more fields as the report is build based on the
// specification provided above. But you should have all the fields
// that are listed in the report specification
    const dataset = [
        {customer_name: 'IBM', status_id: 1, note: 'some note', misc: 'not shown'},
        {customer_name: 'HP', status_id: 0, note: 'some note'},
        {customer_name: 'MS', status_id: 0, note: 'some note', misc: 'not shown'}
    ];

// Define an array of merges. 1-1 = A:1
// The merges are independent of the data.
// A merge will overwrite all data _not_ in the top-left cell.
    const merges = [
        {start: {row: 1, column: 1}, end: {row: 1, column: 10}},
        {start: {row: 2, column: 1}, end: {row: 2, column: 5}},
        {start: {row: 2, column: 6}, end: {row: 2, column: 10}}
    ];

// Create the excel report.
// This function will return Buffer
    const report = excel.buildExport(
        [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
            {
                name: 'Report', // <- Specify sheet name (optional)
                heading: heading, // <- Raw heading array (optional)
                merges: merges, // <- Merge cell ranges
                specification: specification, // <- Report specification
                data: dataset // <-- Report data
            }
        ]
    );

// You can then return this straight
    res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers)
    res.responseType = "blob";
    return res.send(report);

// OR you can save this buffer to the disk by creating a file.

});


app.listen(4000, () => console.log('InterviewerAPI listening on port 4040!'));