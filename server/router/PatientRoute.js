const express = require('express');
const router = express.Router();
const Patient = require('../models/patientModel');
const bcrypt = require("bcrypt")
// Post request for store Patient data to database 
router.post('/signup', async (req, res) => {
    try {
        const { name, email, phone, password, cpassword, gender, address, dob } = req.body;
        if (!name || !email || !phone || !password || !cpassword || !gender || !address || !dob) {
            throw new Error("Please fill all required detail");
        }
        if (password !== cpassword) {
            throw new Error("Password and confirm password are not matched");
        }
        const isExits = await Patient.findOne({ email: email });
        if (isExits) {
            throw new Error("Patient already registered");
        }
        const patientData = new Patient(req.body);
        const result = await patientData.save();
        res.status(201).json({ message: "Patient added successfully" });
    }
    catch (err) {
        console.log("Error while Storing patient ==> ", err);
        res.status(400).send({ error: err.toString() });
    }
});

router.post('/login',async (req,res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("Please Fill all the field");
        }
        const result = await Patient.findOne({ email: email }); 
        if (result){
            const isMatch = await bcrypt.compare(password,result.password);
            if(isMatch){
                const token = await result.getAuthenticationToken();
                // console.log(token);
                res.cookie("jwtToken", token, {
                    expires: new Date(Date.now() + 86400000),
                    httpOnly: true,
                })
                res.json({msg: "Login successfull"});
            }
            else{
                res.status(400).json({msg: "Invalid Credential"});
            }
        }
        else
            res.status(403).json({msg: "Patient is not registerd"});

    }
    catch (err) {
        console.log("Error in Patient login  ==> ", err);
        res.status(400).json({ msg: err.toString() });
    }
});

// Get request for getting patient data
router.get('/', async (req, res) => {
    try {
        const query = req.query;
        for (let key in query) {
            query[key] = new RegExp(query[key], "i");
            if (key === "password") query[key] = undefined;
        }
        const result = await Patient.find(query, { _id: 0, date: 0, __v: 0, "appointments._id": 0 });
        if (result.length !== 0) res.status(200).send(result);
        else res.status(403).json({ message: "No data found" });
    }
    catch (err) {
        console.log("Error while displaying patient data: ", err);
        res.send({ message: err.toString() });
    }
});

// Patch request for Updating patients data
router.patch('/:patientId', async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const data = req.body;
        let result = await Patient.findByIdAndUpdate({ _id: patientId }, data, {
            new: true
        });
        result = result.hideData();
        if (result) res.status(200).send(result);
        else res.status(403).json({ message: "Data not found" });
    }
    catch (err) {
        console.log("Error while Updating Patient detail : ", err);
        res.status(400).json({ message: err.toString() })
    }
});

// delete request for deleting hospital data
router.delete('/:patientId', async (req, res) => {
    try {
        const patientId = req.params.patientId;
        let result = await Patient.findByIdAndDelete({ _id: patientId });
        if (result) res.status(200).json({ massage: `${result.name} is delected successfully` })
        else res.status(403).json({ message: "Data not found" });
    }
    catch (err) {
        console.log("Error while deleting patient: ", err);
        res.status(400).json({ message: err.toString() })
    }
});

module.exports = router;