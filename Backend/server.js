const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router/router.js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URI, {useNewUrlParser:true, useCreateIndex: true, autoCreate: true}, () => {
    console.log('MongoDB server is up')
});



app.use(router);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}` )
});
