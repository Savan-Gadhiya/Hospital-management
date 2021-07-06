const express = require("express");
const router = express.Router();
const AuthenticatePatient = require("../middleware/AuthenticatePatient");
const AuthenticateHospital = require("../middleware/AuthenticateHospital");
const Appointment = require("../models/appointmentModel");
const Hospital = require("../models/hospitalModel");

// Book Appointment for patient
router.post('/bookappointment', AuthenticatePatient, async (req, res) => {
    try {
        const patientId = req.id;
        // console.log(req.body);
        // const appointmentStatus = "open";
        const appointmentTime = Date.parse(req.body.appointmentTime);
        // console.log("appointmentTime = ",appointmentTime);
        const { hospitalId, hospitalName, hospitalEmail, hospitalPhone, patientName, patientEmail, patientPhone } = req.body;

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

// Display a appointment for patient
router.post('/getforpatient', AuthenticatePatient, async (req, res) => {
    try {
        const { ...other } = req.body;
        const UpdateUnvisited = await Appointment.updateMany({ appointmentTime: { $lt: Date.now() }, appointmentStatus: "open" }, { appointmentStatus: "notVisited" })
        if (!UpdateUnvisited) {
            throw new Error("Error while updating appointment data");
        }
        else {
            console.log(UpdateUnvisited)
        }
        const result = await Appointment.find({ patientId: req.id, ...other }, { __v: 0, patientName: 0, patientEmail: 0, patientPhone: 0 });
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(500).json("Something want to wrong");
        }
    }
    catch (err) {
        console.log("Error while displaying appointment");
        res.status(400).json({ msg: err.toString() });
    }
})

// Display appointment for hospital
router.post('/getforhospital', AuthenticateHospital, async (req, res) => {
    try {
        const UpdateUnvisited = await Appointment.updateMany({ appointmentTime: { $lt: Date.now() }, appointmentStatus: "open" }, { appointmentStatus: "notVisited" })
        if (!UpdateUnvisited) throw new Error("Error while updating appointment data");
        // else console.log(UpdateUnvisited)
        const { ...other } = req.body;
        const result = await Appointment.find({ hospitalId: req.id, ...other }, { __v: 0, hospitalName: 0, hospitalEmail: 0, hospitalPhone: 0 });
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(500).json("Something want to wrong");
        }
    }
    catch (err) {
        console.log("Error while displaying appointment");
        res.status(400).json({ msg: err.toString() });
    }
})
// Update a appointment
router.patch("/:appointmentId", AuthenticateHospital, async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;
        const data = req.body;
        const result = await Appointment.findByIdAndUpdate({ _id: appointmentId }, {
            appointmentStatus: "close",
            staffName: data.staffName,
            staffId: data.staffId,
            remarks: data.remarks,
            medicalStatus: data.medicalStatus,
            medicine: data.medicineArr
        }, { new: true });
        if (result) res.status(200).json({ msg: "Appointment updated successfully" });
        else res.status(500).json({ msg: "Error while updating data Please try after some time" })
    }
    catch (err) {
        console.log("Error while updating appointment");
        res.status(400).json({ msg: err.toString() });
    }
})

// Get Appointment Count for parient
router.get("/patient/getcount", AuthenticatePatient, async (req, res) => {
    try {
        const patientId = req.id;
        const allAppointment = await Appointment.find({ patientId: patientId }).countDocuments();
        const openAppointment = await Appointment.find({ patientId: patientId, appointmentStatus: "open" }).countDocuments();
        const closeAppointment = await Appointment.find({ patientId: patientId, appointmentStatus: "close" }).countDocuments();
        res.status(200).json({
            allAppointment: allAppointment,
            openAppointment: openAppointment,
            closeAppointment: closeAppointment
        });
    }
    catch (err) {
        console.log("Error while get all appointments for patient", err);
        res.status(500).json({ msg: "Some thing want to wrong" })
    }
});

// Get Appointment count for a hospital
router.get("/hospital/getcount",AuthenticateHospital, async (req,res) => {
    try{
        const hospitalId = req.id;
        const allAppointment = await Appointment.find({ hospitalId: hospitalId }).countDocuments();
        const openAppointment = await Appointment.find({ hospitalId: hospitalId, appointmentStatus: "open" }).countDocuments();
        const closeAppointment = await Appointment.find({ hospitalId: hospitalId, appointmentStatus: "close" }).countDocuments();
        res.status(200).json({
            allAppointment: allAppointment,
            openAppointment: openAppointment,
            closeAppointment: closeAppointment
        });
    }
    catch(err){
        console.log("Error while get all Appointment for hospital",err);
        res.status(500).json({msg: "Some thing want to wrong"});
    }
})
module.exports = router;