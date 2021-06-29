const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    password: {
        type: String,
        require: true
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
    hospitalId:  String,
    departmentId: String,
    disease: [
        {
            type: String
        }
    ],
    medicalRecord: [
        {
            record: String,
            status: String,
            date: Date,
        }
    ],
    appointments:[
        {
            hospitalId: String,
            time: Date
            // departmentId: String,
            // title: String,
            // desc: String,
            // appointmentStatus: String,
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});
// Hash the password
PatientSchema.pre("save",async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
})

// delete some data 
PatientSchema.methods.hideData = function(){
    let newObj = this;
    const fieldToDelete = ["password","date","__v"]
    fieldToDelete.forEach((key) => {
        newObj[key] = undefined;
    });
    return newObj;
}
const Patient = mongoose.model('patient', PatientSchema);

module.exports = Patient;
