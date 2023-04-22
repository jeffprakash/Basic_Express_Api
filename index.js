const express= require('express');
const router1 = require('./routers/routes');
const bodyParser = require('body-parser');
const mongoose1 = require('mongoose');


const app = express();


mongoose1.connect("mongodb+srv://jeffprakash:YEcVWZ2vpgNxmQOQ@cluster0.n6lkpby.mongodb.net/Cluster0");
mongoose1.Promise = global.Promise;   // To avoid deprecation warning

app.use(bodyParser.json());

app.use('/api', router1);

app.use((err, req, res, next) => {
    res.status(422).send({error: err.message});
});




app.listen(3333, () => console.log('Server started'));