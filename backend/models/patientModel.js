const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
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
        address1: String,
        address2: String,
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
    date: {
        type: Date,
        default: Date.now
    },
    tokens: [
        {
            token: String
        }
    ]
});
// Hash the password
PatientSchema.pre("save",async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
})
// Get Autentication Token
PatientSchema.methods.getAuthenticationToken = async function(){
    try{
        const token = jwt.sign({id: this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        // await this.save();
        return token;
    }
    catch(err){
        console.log("Error while genrating Patient token : ",err);
    }
}

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
