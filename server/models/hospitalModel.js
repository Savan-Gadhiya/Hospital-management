const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const HospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true,
    },
    address: {
        street: String,
        city: String,
        pincode: Number,
        state: String,
        country: String
    },
    departments: [
        {
            name: {
                type: String,
                trim: true,
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

HospitalSchema.pre('save',async function(next){
    if(this.isModified('password')){
        try{
            this.password = await bcrypt.hash(this.password,12);
        }
        catch(err){
            console.log("Error in password hash ===> ",err);
        }
    }
    next();
})

const Hospital = mongoose.model('hospital', HospitalSchema);

module.exports = Hospital;