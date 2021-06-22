const mongoose = require('mongoose');
const color = require("colors");
mongoose.connect('mongodb://localhost:2017/Hospital_managment', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => { console.log("DB Connected") })
.catch((err) => { console.log("Error in connection : ", err) })