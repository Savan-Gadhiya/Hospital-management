const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config({ path: "./config/config.env" });
require('./db/dbConnect')
const router = require('./router/mainRoute');
const cookieParser = require('cookie-parser')
require('colors');


app.use(cors())
const port = process.env.PORT || 8000;
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server stated at port ${port}`.blue.bold);
});

