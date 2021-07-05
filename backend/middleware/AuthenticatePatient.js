const jwt = require("jsonwebtoken");
const Patient  = require("../models/patientModel");

const PatientAuthenticate = async (req,res,next) => {
    try{
        const token = req.cookies.jwtToken;
        // console.log("Authentication for patient...");
        const id = jwt.verify(token,process.env.SECRET_KEY).id;
        const result = await Patient.findOne({_id: id});
        if(!result){
            throw new Error("You need to login for accessing this page content")
        }
        // // Set some importent data to undefined
        result.password = undefined;
        result.__v = undefined;
        result.tokens = undefined;
        req.token = token;
        req.id = result._id;
        req.PatientDetail = result;
        console.log("Authentication successfull");
        next();
    }
    catch(err){
        console.log("Error while authenticat patient ==> ",err);
        res.status(400).json({msg: err.toString()})
    }
}

module.exports = PatientAuthenticate;