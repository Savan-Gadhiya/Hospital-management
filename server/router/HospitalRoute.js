const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const Hospital = require('../models/hospitalModel');
const Patient = require('../models/patientModel');
const Staff = require('../models/staffModel');

// Hospital Signup
// Post request for store Hispital data to database 
router.post('/signup', async (req, res) => {
    try {
        console.log("request come : ", req.body);
        const { name, email, phone, password, cpassword, departments, address } = req.body;
        // Check that all field are filled or not
        if (!name || !email || !phone || !password || !cpassword || !departments || !address) {
            throw new Error("Please fill all the fields");
        }
        // Check password and confirm password
        if (password !== cpassword) {
            throw new Error("Password and Confirm Password are not matched");
        }
        // check that email is exits or not
        const isExits = await Hospital.findOne({ email: email });
        if (isExits) {
            throw new Error("Hospital Already registered");
        }
        const hospitalData = new Hospital(req.body);
        const result = await hospitalData.save();
        res.status(201).json({ message: "Hospital Added Successfully" });

    }
    catch (err) {
        res.status(400).json({ error: err.toString() });
        console.log("Error While saving a Hospital Data ==> ", err, typeof err);
    }
});

// Post erquest for login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("Please Fill all the field");
        }
        const result = await Hospital.findOne({ email: email }); 
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
            res.status(403).json({msg: "Hospital is not registerd"});

    }
    catch (err) {
        console.log("Error in Hospital login  ==> ", err);
        res.status(400).json({ msg: err.toString() });
    }
});

// Get request for getting hospital data 
router.get('/', async (req, res) => {
    try {
        const query = req.query; // aa req.query url na je url?name=savan&&age=20 hoy to {"name": "savan","age": 20} ae rite ape
        console.log(query);
        for (let key in query) {
            query[key] = new RegExp(query[key], 'i');
            if (key === "password") query[key] = undefined;
        }
        const result = await Hospital.find(query, { _id: 0, "departments._id": 0, date: 0, __v: 0, password: 0 });
        if (result.length !== 0) res.status(200).json(result);
        else res.status(403).json({ message: "No data found" });
    }
    catch (err) {
        console.log("Error while displaying Hospital data: ", err);
        res.status(400).josn({ message: err.toString() })
    }
});

// Patch request for Updating hospital data
router.patch('/:hospitalId', async (req, res) => {
    try {
        const hospitalId = req.params.hospitalId;
        const data = req.body;
        let result = await Hospital.findByIdAndUpdate({ _id: hospitalId }, data, {
            new: true
        });
        if (result)
            result = result.hideData();
        if (result) res.status(200).send(result);
        else res.status(403).json({ message: "Data not found" });
    }
    catch (err) {
        console.log("Error while Updating hospital detail : ", err);
        res.status(400).json({ message: err.toString() })
    }
});

// delete request for deleting hospital data
router.delete('/:hospitalId', async (req, res) => {
    try {
        const hospitalId = req.params.hospitalId;
        let result = await Hospital.findByIdAndDelete({ _id: hospitalId });
        const delStaff = await Staff.deleteMany({ hospitalId: hospitalId });

        // Delete a appoinment that is taken in this(deleted) hospital

        const listOfupdatePatient = await Patient.find({ "appointments.hospitalId": hospitalId }); // list Of updatePatient this contain a list of all the patient which have appiment with this postital
        listOfupdatePatient.forEach((ele, idx) => {
            let appointments = ele.appointments;
            appointments = appointments.filter((appoinment) => { // and appoinment contain the array of all appinment and we delete that appoinment which has a appoinment with a deleted hospital
                return appoinment.hospitalId !== hospitalId
            });
            Patient.updateOne({ _id: ele.id }, { appointments: appointments })
                .then((result) => { console.log("appoinment updated when hospital is deleted"); })
                .catch((err) => { console.log(err); })
        });
        if (result) res.status(200).json({ massage: `${result.name} is delected successfully` });
        else res.status(403).json({ message: "Data not found" });
    }
    catch (err) {
        console.log("Error while deleting hospital: ", err);
        res.status(400).json({ message: err.toString() })
    }
});


module.exports = router;