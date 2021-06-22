const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    phone: {
        type: Number,
        require: true,
        minlength: 10,
        maxlength: 10
    },
    gender: {
        type: String,
        require: true
    },
    address: {
        street: String,
        city: String,
        pincode: Number,
        state: String,
        country: String
    },
    dob: Date,
    hospitalId: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true   
    },
    disease: [
        {
            name: String
        }
    ],
    medicalRecord:[
        {
            record: String,
            status: String,
            date: Date,
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

const Patient = mongoose.model('patient',PatientSchema);

module.exports = Patient;
