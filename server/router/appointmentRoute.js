const express = require("express");
const router = express.Router();
const AuthenticatePatient = require("../middleware/AuthenticatePatient");
const Appointment = require("../models/appointmentModel");
const Hospital = require("../models/hospitalModel");

// Book Appointment for patient
router.post('/bookappointment', AuthenticatePatient, async (req, res) => {
    try {
        const patientId = req.id;
        console.log(req.body);
        // const appointmentStatus = "open";
        const { hospitalId, appointmentTime, hospitalName, hospitalEmail, hospitalPhone, patientName, patientEmail, patientPhone } = req.body;
        if (!patientId || !hospitalId || !appointmentTime) {
            throw new Error("Please fill all the requird fields");
        }
        const isHospitalFound = await Hospital.findOne({ _id: hospitalId }).countDocuments();
        if (!isHospitalFound) {
            throw new Error("Hospital Not found");
        }

        const appointmentData = new Appointment({
            patientId, hospitalId, appointmentTime, hospitalName, hospitalEmail, hospitalPhone, patientName, patientEmail, patientPhone
        });
        const result = await appointmentData.save();
        if (result) {
            res.status(201).json({ msg: "Appointment Booked successfully" });
        }
        else {
            res.status(500).json({ msg: "Your appointment not booked please try after some time" });
        }

    }
    catch (err) {
        console.log("Error while saving new appointment: ", err);
        res.status(400).json({ msg: err.toString() });
    }


})

// Display a appointment
router.post('/getforpatient',AuthenticatePatient,async (req,res) => {
    try{
        // const {...other} = req.body;
        const result = await Appointment.find({patientId: req.id},{__v:0});
        if(result){
            res.status(200).json(result);
        }
        else{
            res.status(500).json("Something want to wrong");
        }
    }
    catch(err){
        console.log("Error while displaying appointment");
        res.status(400).json({msg: err.toString()});
    }
})
module.exports = router;