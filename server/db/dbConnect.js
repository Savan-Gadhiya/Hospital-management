const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => { console.log("DB Connected"); })
.catch((err) => { console.log("Error in connection : ", err) })