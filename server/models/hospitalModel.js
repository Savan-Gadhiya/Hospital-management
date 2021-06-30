const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
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
        address1: String,
        address2: String,
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
    },
    tokens: [
        {
            token: String
        }
    ]
});

// Hash the password
HospitalSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

HospitalSchema.methods.getAuthenticationToken = async function(){
    try{
        const token = jwt.sign({id: this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }
    catch(err){
        console.log("Error while genrating hospital token : ",err);
    }
}

// delete some field and return after updation
HospitalSchema.methods.hideData = function () {
    let newObj = this;
    const fieldToDelete = ["password", "date","tokens", "__v"]
    fieldToDelete.forEach((key) => {
        newObj[key] = undefined;
    });
    return newObj;
}

const Hospital = mongoose.model('hospital', HospitalSchema);

module.exports = Hospital;