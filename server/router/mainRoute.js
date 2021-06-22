const { response } = require('express');
const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospitalModel');
const Patient = require('../models/patientModel');
const Staff = require('../models/staffModel');
router.get('/', (req, res) => {
    res.send("Home Page");
});

// Post request for store Hispital data to database 
router.post('/api/hospital', async (req, res) => {
    try {
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

// Post request for store Patient data to database 
router.post('/api/patient', async (req, res) => {
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
        res.status(201).json({ message: "Patient registered successfully" });
    }
    catch (err) {
        console.log("Error while Storing patient ==> ", err);
        res.status(400).send({ error: err.toString() });
    }
});

//  Post request for store staff data to database
router.post('/api/staff', async (req, res) => {
    try {
        const { name, email, phone, gender, address, dob, role, department, salary } = req.body;
        if (!name || !email || !phone || !gender || !address || !dob || !role || !department || !salary) {
            throw new Error("Please fill all requied filled");
        }
        const isExits = await Staff.findOne({ email: email });
        if (isExits) {
            throw new Error("Staff member aleadry registerd");
        }
        const StaffData = new Staff(req.body);
        const result = await StaffData.save();
        res.status(201).json({message: "Staff member registerd successfully"});
    }
    catch (err) {
        console.log("Error while storing a staff ==> ", err);
        res.status(400).send({ error: err.toString() })
    }
});



module.exports = router;