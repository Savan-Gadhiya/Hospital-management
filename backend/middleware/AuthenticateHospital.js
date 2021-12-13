const jwt = require("jsonwebtoken");
const Hospital  = require("../models/hospitalModel");

const HospitalAuthenticate = async (req,res,next) => {
    try{
        // console.log("REquest come for hospital ");
        const token = req.cookies.jwtToken;
        const id = jwt.verify(token,process.env.SECRET_KEY).id;
        const result = await Hospital.findOne({_id: id});
        // console.log('result = ',result);
        if(!result){
            throw new Error("You need to login for accessing this page content")
        }
        // Set some importent data to undefined
        result.password = undefined;
        result.__v = undefined;
        result.tokens = undefined;
        req.token = token;
        req.id = result._id;
        req.HospitalDetail = result;
        next();
    }
    catch(err){
        console.log("Error while authenticat Hospital ==> ",err);
        res.status(400).json({msg: err.toString()})
    }
}

module.exports = HospitalAuthenticate;