const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
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
    role: {
        type: String,
        require: true
    },
    hospitalId: {
        type: String,
        require: true
    },
    departmentId: {
        type: String,
        require: true   
    },
    salary: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Staff = mongoose.model('staff',StaffSchema);

module.exports = Staff;
