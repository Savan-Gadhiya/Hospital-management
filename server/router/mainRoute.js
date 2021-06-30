const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospitalModel');
const Patient = require('../models/patientModel');
const Staff = require('../models/staffModel');
router.get("/test",(req,res) => {
    res.send("Api Running");
})
// router.use(router)
// -----------------------------  Post Request  ------------------------------------
// Post request for store Hispital data to database 
router.post('/api/hospital', async (req, res) => {
    try {
        // console.log("request come : ",req.body);
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
        res.status(201).json({ message: "Patient added successfully" });
    }
    catch (err) {
        console.log("Error while Storing patient ==> ", err);
        res.status(400).send({ error: err.toString() });
    }
});

//  Post request for store staff data to database
router.post('/api/staff', async (req, res) => {
    try {
        const { name, email, phone, gender, address, dob, role, hospitalId, departmentId, salary } = req.body;
        if (!name || !email || !phone || !gender || !address || !dob || !role || !hospitalId || !departmentId || !salary) {
            throw new Error("Please fill all requied filled");
        }
        const isExits = await Staff.findOne({ email: email });
        if (isExits) {
            throw new Error("Staff member aleadry registerd");
        }
        const StaffData = new Staff(req.body);
        const result = await StaffData.save();
        res.status(201).json({ message: "Staff member registerd successfully" });
    }
    catch (err) {
        console.log("Error while storing a staff ==> ", err);
        res.status(400).send({ error: err.toString() })
    }
});

// -----------------------------  Get Request  ------------------------------------
// Get request for getting hospital data 
router.get('/api/hospital', async (req, res) => {
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

// Get request for getting patient data
router.get('/api/patient', async (req, res) => {
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

// Get request for getting staff data
router.get('/api/staff', async (req, res) => {
    try {
        const query = req.query;
        for (let key in query) {
            query[key] = new RegExp(query[key], "i");
        }
        const result = await Staff.find(query, { _id: 0, date: 0, __v: 0 });
        if (result.length !== 0) res.send(result);
        else res.status(403).json({ message: "No data found" });
    }
    catch (err) {
        console.log("Error while displaying staff", err);
        res.status(400).json({ message: err.toString() })
    }
});

// -----------------------------  patch Request  ------------------------------------
// Patch request for Updating hospital data
router.patch('/api/hospital/:hospitalId', async (req, res) => {
    try {
        const hospitalId = req.params.hospitalId;
        const data = req.body;
        let result = await Hospital.findByIdAndUpdate({ _id: hospitalId }, data, {
            new: true
        });
        result = result.hideData();
        if (result) res.status(200).send(result);
        else res.status(403).json({ message: "Data not found" });
    }
    catch (err) {
        console.log("Error while Updating hospital detail : ", err);
        res.status(400).json({ message: err.toString() })
    }
});

// Patch request for Updating patients data
router.patch('/api/patient/:patientId', async (req, res) => {
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

// Patch request for updating staff data
router.patch('/api/staff/:staffId', async (req, res) => {
    try {
        const staffId = req.params.staffId;
        const data = req.body;
        let result = await Staff.findByIdAndUpdate({ _id: staffId }, data, {
            new: true
        });
        if (result) res.status(200).send(result);
        else res.status(403).json({ message: "Data not found" });
    }
    catch (err) {
        console.log("Error while Updating Staff detail : ", err);
        res.status(400).json({ message: err.toString() })
    }
});

// ----------------------  Delete Request  -----------------------------
// delete request for deleting hospital data
router.delete('/api/hospital/:hospitalId', async (req, res) => {
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

// delete request for deleting hospital data
router.delete('/api/patient/:patientId', async (req, res) => {
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

// delete request for deleting hospital data
router.delete('/api/staff/:staffId', async (req, res) => {
    try {
        const staffId = req.params.staffId;
        let result = await Staff.findByIdAndDelete({ _id: staffId });
        if (result) res.status(200).json({ massage: `${result.name} is delected successfully` })
        else res.status(403).json({ message: "Data not found" });
    }
    catch (err) {
        console.log("Error while deleting staff: ", err);
        res.status(400).json({ message: err.toString() })
    }
});

module.exports = router;