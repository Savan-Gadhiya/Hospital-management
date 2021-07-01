const express = require('express');
const router = express.Router();
const Staff = require('../models/staffModel');
const AuthenticateHospital = require("../middleware/AuthenticateHospital")
//  Post request for store staff data to database
router.post('/addstaff', AuthenticateHospital, async (req, res) => {
    console.log("REquest COME =============");
    try {
        const { name, email, phone, gender, address, dob, role,hospitalId, departmentId, salary } = req.body;
        if (!name || !email || !phone || !gender || !address || !dob || !hospitalId || !role || !hospitalId || !departmentId || !salary) {
            throw new Error("Please fill all requied filled");
        }
        
        const isExits = await Staff.findOne({ email: email });
        if (isExits) {
            throw new Error("Staff member aleadry registerd");
        }
        console.log(req.body);
        const StaffData = new Staff(req.body);
        const result = await StaffData.save();
        res.status(201).json({ message: "Staff member registerd successfully" });
    }
    catch (err) {
        console.log("Error while storing a staff ==> ", err);
        res.status(400).send({ error: err.toString() })
    }
});

router.get('/getstaff', AuthenticateHospital, async (req, res) => { // Get data of a hospital which are login
    res.json(req.HospitalDetail);
})

// Get request for getting staff data
router.get('/', async (req, res) => {
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


// Patch request for updating staff data
router.patch('/:staffId', async (req, res) => {
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

// delete request for deleting hospital data
router.delete('/:staffId', async (req, res) => {
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