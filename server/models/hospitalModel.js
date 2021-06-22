const mongoose = require('mongoose');

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
                require: true,
                unique: true,
                trim: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

const Hospital = mongoose.model('hospital', HospitalSchema);

module.exports = Hospital;