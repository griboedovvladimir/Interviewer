const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

app.listen(4000, () => console.log('Gator app listening on port 3000!'));