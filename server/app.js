const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config({ path: "./config/config.env" });
require('./db/dbConnect')
const router = require('./router/mainRoute');
require('colors');


const port = process.env.PORT || 8000;
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server stated at port ${port}`.blue.bold);
});

